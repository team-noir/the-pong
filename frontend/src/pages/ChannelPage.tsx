import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getWhoami,
  getChannel,
  getChannelMessages,
  postChannelMessages,
  putChannelUsers,
  deleteChannel,
  patchChannelUserRole,
  patchChannelUserStatus,
  patchChannelSetting,
  ChannelFormType,
} from 'api/api.v1';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Button from 'components/atoms/Button';
import { ChannelType } from 'types/channelType';
import {
  ChannelUserRoleType,
  ChannelUserStatusType,
} from 'types/channelUserType';
import { MessageType } from 'types/messageType';
import { UserType } from 'types/userType';

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
    queryFn: getWhoami,
  });

  const getChannelQuery = useQuery<ChannelType, AxiosError>({
    queryKey: ['getChannel', channelId],
    queryFn: () => getChannel(channelId),
  });

  const getChannelMessagesMutation = useMutation<
    MessageType[],
    AxiosError,
    number
  >(getChannelMessages);

  const postChannelMessagesMutation = useMutation<
    any,
    AxiosError,
    { channelId: number; message: string }
  >(postChannelMessages);

  const patchChannelSettingMutation = useMutation(patchChannelSetting);
  const putChannelUsersMutation = useMutation(putChannelUsers);

  const deleteChannelMutation = useMutation(deleteChannel);

  const patchChannelUserRoleMutation = useMutation<any, AxiosError, any>({
    mutationFn: patchChannelUserRole,
    onSuccess: () => getChannelQuery.refetch(),
  });

  const patchChannelUserStatusMutation = useMutation<any, AxiosError, any>({
    mutationFn: patchChannelUserStatus,
    onSuccess: () => getChannelQuery.refetch(),
  });

  const changeRole = ({
    userId,
    role,
  }: {
    userId: number;
    role: ChannelUserRoleType;
  }) => {
    patchChannelUserRoleMutation.mutate({
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
    patchChannelUserStatusMutation.mutate({
      channelId: getChannelQuery.data?.id,
      userId,
      status,
    });
  };

  useEffect(() => {
    if (getChannelQuery.data) {
      getChannelMessagesMutation.mutate(getChannelQuery.data.id);
    }
  }, [getChannelQuery.data]);

  useEffect(() => {
    if (getChannelMessagesMutation.data) {
      setMessages([...getChannelMessagesMutation.data]);
    }
  }, [getChannelMessagesMutation.data]);

  useEffect(() => {
    socket.on('message', (data: MessageType) => {
      console.log('socket message data', data);
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
      console.log('socket notice data', data);
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

    postChannelMessagesMutation.mutate({
      channelId: Number(channelId),
      message,
    });
  };

  const inviteUsers = (userIds: number[]) => {
    if (!channelId) return;

    putChannelUsersMutation.mutate(
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
    deleteChannelMutation.mutate(Number(channelId), {
      onError: () => alert('다시 시도해 주세요.'),
      onSuccess: () => {
        queryClient.invalidateQueries(['getChannel', channelId]);
        navigate('/channel');
      },
    });
  };

  const changeChannelSetting = (channelForm: ChannelFormType) => {
    patchChannelSettingMutation.mutate(channelForm, {
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
