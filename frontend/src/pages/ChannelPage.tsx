import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as api from 'api/api.v1';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Button from 'components/atoms/Button';
import {
  UserType,
  ChannelType,
  ChannelUserRoleType,
  ChannelUserStatusType,
  MessageType,
  ChannelFormType,
} from 'types';

export default function ChannelPage() {
  const navigate = useNavigate();
  const { channelId } = useParams() as { channelId: string };
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowInvite, setIsShowInvite] = useState(false);

  const queryClient = useQueryClient();

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: api.whoami,
  });

  const getChannelQuery = useQuery<ChannelType, AxiosError>({
    queryKey: ['getChannel', channelId],
    queryFn: () => api.getChannel(channelId),
  });

  const getMessagesMutation = useMutation<MessageType[], AxiosError, number>(
    api.getMessages
  );

  const sendMessageMutation = useMutation<
    any,
    AxiosError,
    { channelId: number; message: string }
  >(api.sendMessage);

  const updateChannelSettingMutation = useMutation(api.updateChannelSetting);
  const inviteUserToChannelMutation = useMutation(api.inviteUserToChannel);

  const leaveChannelMutation = useMutation(api.leaveChannel);

  const updateChannelUserRoleMutation = useMutation<any, AxiosError, any>({
    mutationFn: api.updateChannelUserRole,
    onSuccess: () => getChannelQuery.refetch(),
  });

  const updateChannelUserStatusMutation = useMutation<any, AxiosError, any>({
    mutationFn: api.updateChannelUserStatus,
    onSuccess: () => getChannelQuery.refetch(),
  });

  const changeRole = ({
    userId,
    role,
  }: {
    userId: number;
    role: ChannelUserRoleType;
  }) => {
    updateChannelUserRoleMutation.mutate({
      channelId: getChannelQuery.data?.id,
      userId,
      role,
    });
  };

  const changeStatus = ({
    userId,
    status,
  }: {
    userId: number;
    status: ChannelUserStatusType;
  }) => {
    updateChannelUserStatusMutation.mutate({
      channelId: getChannelQuery.data?.id,
      userId,
      status,
    });
  };

  useEffect(() => {
    if (getChannelQuery.data) {
      getMessagesMutation.mutate(getChannelQuery.data.id);
    }
  }, [getChannelQuery.data]);

  useEffect(() => {
    if (getMessagesMutation.data) {
      setMessages([...getMessagesMutation.data]);
    }
  }, [getMessagesMutation.data]);

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

    inviteUserToChannelMutation.mutate(
      { channelId: Number(channelId), userIds },
      {
        onError: () => alert('다시 시도해 주세요.'),
        onSuccess: () => {
          setIsShowInvite(false);
          queryClient.invalidateQueries(['getChannel', channelId]);
        },
      }
    );
  };

  const leaveChannel = () => {
    leaveChannelMutation.mutate(Number(channelId), {
      onError: () => alert('다시 시도해 주세요.'),
      onSuccess: () => {
        queryClient.invalidateQueries(['getChannel', channelId]);
        navigate('/channel');
      },
    });
  };

  const changeChannelSetting = (channelForm: ChannelFormType) => {
    updateChannelSettingMutation.mutate(channelForm, {
      onError: () => alert('다시 시도해 주세요.'),
      onSuccess: () => {
        setIsShowSetting(false);
        queryClient.invalidateQueries(['getChannel', channelId]);
      },
    });
  };

  if (
    whoamiQuery.status === 'loading' ||
    getChannelQuery.status === 'loading'
  ) {
    return <div>Loading...</div>;
  }

  if (whoamiQuery.status === 'error' || getChannelQuery.status === 'error') {
    alert('에러가 발생했습니다.');
    navigate('/channel');
  }

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={getChannelQuery.data?.title || ''}
          button={
            <Button type="button" onClick={() => setIsShowDetail(true)}>
              메뉴
            </Button>
          }
        />
      }
    >
      <>
        {whoamiQuery.data && getChannelQuery.data && (
          <>
            <Channel
              messages={messages}
              postMessage={postMessage}
              myUserId={whoamiQuery.data.id}
            />
            {isShowDetail && (
              <ChannelDetail
                channel={getChannelQuery.data}
                changeRole={changeRole}
                changeStatus={changeStatus}
                myUserId={whoamiQuery.data.id}
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
          </>
        )}
      </>
    </AppTemplate>
  );
}
