import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, sendMessage } from 'api/rest.v1';
import { onMessage, onNotice, onUser } from 'api/socket.v1';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import ChannelDetail from 'components/organisms/Channel/ChannelDetail';
import ChannelSetting from 'components/organisms/Channel/ChannelSetting';
import ChannelInvite from 'components/organisms/Channel/ChannelInvite';
import MessageList from 'components/molecule/MessageList';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import { ChannelType, MessageType, NoticeType } from 'types';
import ROUTES from 'constants/routes';
import { NOTICE_STATUS } from 'constants/index';
import QUERY_KEYS from 'constants/queryKeys';
import SOCKET_EVENTS from 'constants/socketEvents';

interface Props {
  channel: ChannelType;
  myUserId: number;
  isShowDetail: boolean;
  onClickCloseDetail: () => void;
}

interface FormData {
  message: string;
  placeholder: string;
  disabled: boolean;
}

export default function Channel({
  channel,
  myUserId,
  isShowDetail,
  onClickCloseDetail,
}: Props) {
  const [formData, setFormData] = useState<FormData>({
    message: '',
    placeholder: '메시지를 입력하세요',
    disabled: false,
  });
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowInvite, setIsShowInvite] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();

  const scrollRef = useRef<HTMLDivElement>(null);

  const messageQueryKey = [QUERY_KEYS.MESSAGES, String(channel.id)];

  const { data: messages } = useQuery<MessageType[]>({
    queryKey: messageQueryKey,
    queryFn: () => getMessages(channel.id),
    staleTime: Infinity,
  });

  const sendMessageMutation = useMutation(sendMessage);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!channel.users) return;
    const myUser = channel.users.find((user) => user.id === myUserId);
    myUser &&
      setFormData((prevState) => ({
        ...prevState,
        placeholder: myUser.isMuted
          ? '30초간 채팅이 금지되었습니다.'
          : '메시지를 입력하세요',
        disabled: myUser.isMuted,
      }));
  }, [channel.users]);

  useEffect(() => {
    onMessage((data: MessageType) => {
      const newMessage: MessageType = {
        id: data.id,
        channelId: data.channelId,
        senderId: data.senderId,
        senderNickname: data.senderNickname,
        isLog: false,
        text: data.text,
        createdAt: data.createdAt,
      };
      if (data.channelId !== channel.id) return;
      queryClient.setQueryData<MessageType[]>(messageQueryKey, (oldData) =>
        oldData ? [...oldData, newMessage] : oldData
      );
    });

    onNotice((data: NoticeType) => {
      const newNotice: MessageType = {
        id: data.id,
        channelId: data.channelId,
        isLog: true,
        text: data.text,
        createdAt: data.createdAt,
      };
      if (data.channelId !== channel.id) return;
      queryClient.setQueryData<MessageType[]>(messageQueryKey, (oldData) =>
        oldData ? [...oldData, newNotice] : oldData
      );

      if (data.code === NOTICE_STATUS.CHANNEL_REMOVE) {
        setModalMessage(
          '채널장이 채널을 삭제했습니다. 더 이상 대화를 할 수 없습니다.'
        );
        return;
      }

      queryClient.invalidateQueries([QUERY_KEYS.CHANNEL, String(channel.id)]);
      const isIncludeMeInUsers = data.users.some(
        (user) => user.id === myUserId
      );
      if (isIncludeMeInUsers) {
        data.code === NOTICE_STATUS.USER_MUTE &&
          setFormData((prevState) => ({
            ...prevState,
            placeholder: '30초간 채팅이 금지되었습니다.',
            disabled: true,
          }));
        data.code === NOTICE_STATUS.USER_UNMUTE &&
          setFormData((prevState) => ({
            ...prevState,
            placeholder: '메시지를 입력하세요',
            disabled: false,
          }));
        data.code === NOTICE_STATUS.USER_KICK &&
          setModalMessage(
            '채널에서 내보내졌습니다. 채널에 다시 참여할 수 있습니다.'
          );
        data.code === NOTICE_STATUS.USER_BAN &&
          setModalMessage(
            '채널에서 차단되었습니다. 채널에 다시 참여할 수 없습니다.'
          );
      }
    });

    onUser(() => {
      queryClient.invalidateQueries([QUERY_KEYS.CHANNEL, String(channel.id)]);
    });

    return () => {
      socket.off(SOCKET_EVENTS.CHANNEL.MESSAGE);
      socket.off(SOCKET_EVENTS.CHANNEL.NOTICE);
      socket.off(SOCKET_EVENTS.CHANNEL.USER);
    };
  }, [socket]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setFormData({ ...formData, message: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.message) return;

    sendMessageMutation.mutate({
      channelId: channel.id,
      message: formData.message,
    });

    setFormData((prevState) => ({ ...prevState, message: '' }));
  };

  return (
    <>
      <div
        id="message-list-wrapper"
        // NOTE: height: 100vh - upper padding - input bar
        className="h-[calc(100vh-6rem-82px)] overflow-y-auto"
        ref={scrollRef}
      >
        {messages && <MessageList messages={messages} myUserId={myUserId} />}
      </div>
      <form
        onSubmit={handleSubmit}
        className="container max-w-xl inline-flex absolute bottom-0 pt-2 pb-4 px-4 -mx-4 gap-2"
      >
        <div className="w-[85%] vh-center">
          <TextInput
            id="message"
            value={formData.message}
            placeholder={formData.placeholder}
            onChange={handleChange}
            fullLength
            disabled={formData.disabled}
          />
        </div>
        <div className="w-[15%] vh-center">
          <Button type="submit" primary fullLength disabled={formData.disabled}>
            보내기
          </Button>
        </div>
      </form>

      {isShowDetail && myUserId && (
        <ChannelDetail
          channel={channel}
          myUserId={myUserId}
          onClickClose={onClickCloseDetail}
          onClickSetting={() => setIsShowSetting(true)}
          onClickInvite={() => setIsShowInvite(true)}
        />
      )}
      {isShowSetting && (
        <ChannelSetting
          channel={channel}
          onClickClose={() => setIsShowSetting(false)}
        />
      )}
      {isShowInvite && channel.users && (
        <ChannelInvite
          channelId={channel.id}
          channelUsers={channel.users}
          onClickClose={() => setIsShowInvite(false)}
        />
      )}
      {modalMessage && (
        /* eslint-disable */
        <Modal onClickClose={() => {}} isShowClose={false} fitContent>
          <div className="flex flex-col vh-center">
            <p>{modalMessage}</p>
            <div className="mt-4">
              <Link
                to={ROUTES.CHANNEL.INDEX}
                className="button primary"
                replace={true}
              >
                채널 로비로 돌아가기
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
