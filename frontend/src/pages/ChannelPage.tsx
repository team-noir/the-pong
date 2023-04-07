import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Button from 'components/atoms/Button';
import { MessageType, ChannelFormType } from 'types';

export default function ChannelPage() {
  const myUserId = useUser((state) => state.id);
  const navigate = useNavigate();
  const { channelId } = useParams() as { channelId: string };
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowInvite, setIsShowInvite] = useState(false);

  const queryClient = useQueryClient();

  const getChannelQuery = useQuery({
    queryKey: ['getChannel', channelId],
    queryFn: () => api.getChannel(Number(channelId)),
  });

  const getMessagesQuery = useQuery({
    queryKey: ['getMessages'],
    queryFn: () => api.getMessages(Number(channelId)),
    staleTime: Infinity,
  });

  const sendMessageMutation = useMutation(api.sendMessage);

  const updateChannelSettingMutation = useMutation({
    mutationFn: api.updateChannelSetting,
    onSuccess: () => {
      setIsShowSetting(false);
      queryClient.invalidateQueries(['getChannel', channelId]);
    },
  });

  const inviteUserToChannelMutation = useMutation({
    mutationFn: api.inviteUserToChannel,
    onSuccess: () => {
      setIsShowInvite(false);
      queryClient.invalidateQueries(['getChannel', channelId]);
    },
  });

  const leaveChannelMutation = useMutation({
    mutationFn: api.leaveChannel,
    onSuccess: () => {
      queryClient.invalidateQueries(['getChannel', channelId]);
      navigate('/channel');
    },
  });

  useEffect(() => {
    if (getMessagesQuery.data) {
      setMessages([...getMessagesQuery.data]);
    }
  }, [getMessagesQuery.data]);

  useEffect(() => {
    socket.on('message', (data: MessageType) => {
      const newMessage: MessageType = {
        id: data.id,
        senderId: data.senderId,
        senderNickname: data.senderNickname,
        isLog: false,
        text: data.text,
        createdAt: data.createdAt,
      };
      setMessages((prev) => [...prev, newMessage]);
    });
    socket.on('notice', (data: MessageType) => {
      const newNotice: MessageType = {
        id: data.id,
        isLog: true,
        text: data.text,
        createdAt: data.createdAt,
      };
      setMessages((prev) => [...prev, newNotice]);
    });
    return () => {
      socket.off('message');
      socket.off('notice');
    };
  }, [socket]);

  const postMessage = (message: string) => {
    if (channelId === undefined) return;

    sendMessageMutation.mutate({
      channelId: Number(channelId),
      message,
    });
  };

  const inviteUsers = (userIds: number[]) => {
    if (!channelId) return;

    inviteUserToChannelMutation.mutate({
      channelId: Number(channelId),
      userIds,
    });
  };

  const leaveChannel = () => {
    leaveChannelMutation.mutate(Number(channelId));
  };

  const changeChannelSetting = (channelForm: ChannelFormType) => {
    updateChannelSettingMutation.mutate(channelForm);
  };

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={getChannelQuery.data.title || ''}
          button={<Button onClick={() => setIsShowDetail(true)}>메뉴</Button>}
        />
      }
    >
      {myUserId && (
        <Channel
          messages={messages}
          postMessage={postMessage}
          myUserId={myUserId}
        />
      )}
      {isShowDetail && myUserId && (
        <ChannelDetail
          channel={getChannelQuery.data}
          myUserId={myUserId}
          onClickSetting={() => setIsShowSetting(true)}
          onClickInvite={() => setIsShowInvite(true)}
          onClickLeave={leaveChannel}
        />
      )}
      {isShowSetting && (
        <ChannelSetting
          channel={getChannelQuery.data}
          onClickClose={() => setIsShowSetting(false)}
          changeChannelSetting={changeChannelSetting}
        />
      )}
      {isShowInvite && getChannelQuery.data.users && (
        <ChannelInvite
          channelUsers={getChannelQuery.data.users}
          onClickClose={() => setIsShowInvite(false)}
          inviteUsers={inviteUsers}
        />
      )}
    </AppTemplate>
  );
}
