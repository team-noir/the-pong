import { useContext, useEffect, useRef } from 'react';
import konva from 'konva';
import { useUser } from 'hooks/useStore';
import { SocketContext } from 'contexts/socket';

type ReturnType = [
  dataChannelRef: React.MutableRefObject<RTCDataChannel | null>
];

export default function useGameRTC(
  gameId: number,
  amIOwner: boolean | undefined,
  canvasRef: React.RefObject<konva.Layer>,
  videoRef: React.RefObject<HTMLVideoElement>,
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  isOtherKeyDown: React.MutableRefObject<{ left: boolean; right: boolean }>
): ReturnType {
  const myUserId = useUser((state) => state.id);
  const socket = useContext(SocketContext);

  const interval = useRef<NodeJS.Timer | null>(null);
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
      socket.off('rtcInit');
      socket.off('rtcGetCandidate');
      socket.off('rtcGetOffer');
      socket.off('rtcGetAnswer');
      interval.current && clearInterval(interval.current);
      if (!peerConnectionsRef.current) return;
      for (const userId in peerConnectionsRef.current) {
        peerConnectionsRef.current[userId].close();
      }
    };
  }, []);

  useEffect(() => {
    if (count > 0) return;
    interval.current && clearInterval(interval.current);
    setIsPlaying(true);
  }, [count]);

  const addRTCSocketListeners = () => {
    socket.on(
      'rtcGetCandidate',
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
    socket.on('rtcInit', async (userId: number) => {
      if (!canvasRef.current) return;
      const stream = canvasRef.current.getNativeCanvasElement().captureStream();
      canvasStreamRef.current = stream;
      if (!canvasStreamRef.current) return;

      const peerConnection = createOfferPeerConnection(userId);
      if (!peerConnection) return;
      peerConnectionsRef.current = {
        ...peerConnectionsRef.current,
        [userId]: peerConnection,
      };

      try {
        const localSdp = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(
          new RTCSessionDescription(localSdp)
        );

        socket.emit('rtcOffer', {
          sdp: localSdp,
          offerSendUserId: myUserId,
          offerReceiveUserId: userId,
        });
      } catch (e) {
        console.error(e);
      }
    });

    socket.on(
      'rtcGetAnswer',
      (data: { sdp: RTCSessionDescription; answerSendUserId: number }) => {
        const { sdp, answerSendUserId } = data;
        if (!peerConnectionsRef.current) return;
        const peerConnection: RTCPeerConnection =
          peerConnectionsRef.current[answerSendUserId];
        if (!peerConnection) return;
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));

        socket.emit('rtcConnected');
        if (isPlaying) return;
        interval.current = setInterval(
          () => setCount((prevState) => prevState - 1),
          1000
        );
      }
    );
  };

  const addNonOwnerRTCSocketListeners = () => {
    socket.on(
      'rtcGetOffer',
      async (data: { sdp: RTCSessionDescription; offerSendUserId: number }) => {
        const { sdp, offerSendUserId } = data;
        const peerConnection = createAnswerPeerConnection(
          String(offerSendUserId)
        );
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
          socket.emit('rtcAnswer', {
            sdp: localSdp,
            answerSendID: myUserId,
            answerReceiveID: offerSendUserId,
          });
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
        socket.emit('rtcCandidate', {
          candidate: e.candidate,
          candidateSendUserId: myUserId,
          candidateReceiveUserId: userId,
        });
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

  const createAnswerPeerConnection = (userId: string) => {
    try {
      const peerConnection = new RTCPeerConnection(peerConnectionConfig);

      peerConnection.onicecandidate = (e) => {
        if (!e.candidate) return;
        socket.emit('rtcCandidate', {
          candidate: e.candidate,
          candidateSendUserId: myUserId,
          candidateReceiveUserId: userId,
        });
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
