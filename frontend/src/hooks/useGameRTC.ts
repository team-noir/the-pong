import { useContext, useEffect, useRef } from 'react';
import * as api from 'api/socket.v1';
import konva from 'konva';
import { useUser } from 'hooks/useStore';
import { SocketContext } from 'contexts/socket';
import SOCKET_EVENTS from 'constants/socketEvents';

type ReturnType = [
  dataChannelRef: React.MutableRefObject<RTCDataChannel | null>
];

export default function useGameRTC(
  gameId: number,
  amIOwner: boolean | undefined,
  canvasRef: React.RefObject<konva.Layer>,
  videoRef: React.RefObject<HTMLVideoElement>,
  isOtherKeyDown: React.MutableRefObject<{ left: boolean; right: boolean }>
): ReturnType {
  const myUserId = useUser((state) => state.id);
  const socket = useContext(SocketContext);

  const peerConnectionsRef = useRef<{
    [userId: number]: RTCPeerConnection;
  } | null>(null);
  const canvasStreamRef = useRef<MediaStream | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  useEffect(() => {
    addRTCSocketListeners();
    amIOwner && addOwnerRTCSocketListeners();
    !amIOwner && addNonOwnerRTCSocketListeners();

    return () => {
      socket.off(SOCKET_EVENTS.GAME.RTC.INIT);
      socket.off(SOCKET_EVENTS.GAME.RTC.GET_CANDIDATE);
      socket.off(SOCKET_EVENTS.GAME.RTC.GET_ANSWER);
      socket.off(SOCKET_EVENTS.GAME.RTC.GET_OFFER);
      if (!peerConnectionsRef.current) return;
      for (const userId in peerConnectionsRef.current) {
        peerConnectionsRef.current[userId].close();
      }
    };
  }, []);

  const addRTCSocketListeners = () => {
    api.onRtcGetCandidate(
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendUserId: number;
      }) => {
        if (!peerConnectionsRef.current) return;
        const peerConnection: RTCPeerConnection =
          peerConnectionsRef.current[data.candidateSendUserId];
        if (!peerConnection) return;
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      }
    );
  };

  const addOwnerRTCSocketListeners = () => {
    api.onRtcInit(async (data: { userId: number }) => {
      if (!canvasRef.current) return;
      const stream = canvasRef.current.getNativeCanvasElement().captureStream();
      canvasStreamRef.current = stream;
      if (!canvasStreamRef.current) return;

      const peerConnection = createOfferPeerConnection(data.userId);
      if (!peerConnection) return;
      peerConnectionsRef.current = {
        ...peerConnectionsRef.current,
        [data.userId]: peerConnection,
      };

      try {
        const localSdp = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(
          new RTCSessionDescription(localSdp)
        );
        myUserId && api.emitRtcOffer(localSdp, myUserId, data.userId);
      } catch (e) {
        console.error(e);
      }
    });

    api.onRtcGetAnswer(
      async (data: {
        sdp: RTCSessionDescription;
        answerSendUserId: number;
      }) => {
        const { sdp, answerSendUserId } = data;
        if (!peerConnectionsRef.current) return;
        const peerConnection: RTCPeerConnection =
          peerConnectionsRef.current[answerSendUserId];
        if (!peerConnection) return;
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(sdp)
        );
        api.emitConnected(answerSendUserId);
      }
    );
  };

  const addNonOwnerRTCSocketListeners = () => {
    api.onRtcGetOffer(
      async (data: { sdp: RTCSessionDescription; offerSendUserId: number }) => {
        const { sdp, offerSendUserId } = data;
        const peerConnection = createAnswerPeerConnection(offerSendUserId);
        if (!peerConnection) return;
        peerConnectionsRef.current = {
          ...peerConnectionsRef.current,
          [offerSendUserId]: peerConnection,
        };

        try {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(sdp)
          );
          const localSdp = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(
            new RTCSessionDescription(localSdp)
          );
          myUserId && api.emitRtcAnswer(localSdp, myUserId, offerSendUserId);
        } catch (e) {
          console.error(e);
        }
      }
    );
  };

  const getRemoteStream = (e: RTCTrackEvent) => {
    if (!videoRef.current) return;
    if (videoRef.current.srcObject !== e.streams[0]) {
      videoRef.current.srcObject = e.streams[0];
    }
  };

  const createOfferPeerConnection = (userId: number) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);
      const channel = peerConnection.createDataChannel(String(gameId));

      channel.onmessage = (e) => {
        const key = e.data;
        if (key === 'DL') {
          isOtherKeyDown.current.left = true;
        } else if (key === 'DR') {
          isOtherKeyDown.current.right = true;
        } else if (key === 'UL') {
          isOtherKeyDown.current.left = false;
        } else if (key === 'UR') {
          isOtherKeyDown.current.right = false;
        }
      };

      peerConnection.ontrack = getRemoteStream;
      peerConnection.onicecandidate = (e) => {
        if (!e.candidate) return;
        myUserId && api.emitRtcCandidate(e.candidate, myUserId, userId);
      };

      if (!canvasStreamRef.current) {
        return peerConnection;
      }
      canvasStreamRef.current.getTracks().forEach((track) => {
        if (!canvasStreamRef.current) return;
        peerConnection.addTrack(track, canvasStreamRef.current);
      });
      return peerConnection;
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswerPeerConnection = (userId: number) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);

      peerConnection.onicecandidate = (e) => {
        if (!e.candidate) return;
        myUserId && api.emitRtcCandidate(e.candidate, myUserId, userId);
      };
      peerConnection.ondatachannel = (e) => {
        dataChannelRef.current = e.channel;
      };
      peerConnection.ontrack = getRemoteStream;

      if (!canvasStreamRef.current) {
        return peerConnection;
      }
      canvasStreamRef.current.getTracks().forEach((track) => {
        if (!canvasStreamRef.current) return;
        peerConnection.addTrack(track, canvasStreamRef.current);
      });
      return peerConnection;
    } catch (e) {
      console.error(e);
    }
  };

  return [dataChannelRef];
}

const peerConnectionConfig = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};
