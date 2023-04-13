import { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, sendMessage } from 'api/api.v1';
import { SocketContext } from 'contexts/socket';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import MessageList from 'components/molecule/MessageList';
import { ChannelType, MessageType, NoticeType } from 'types';
import { NOTICE_STATUS } from 'constants/index';

interface Props {
  channel: ChannelType;
  myUserId: number;
}

interface FormData {
  message: string;
  placeholder: string;
  disabled: boolean;
}

export default function Channel({ channel, myUserId }: Props) {
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    message: '',
    placeholder: '메시지를 입력하세요',
    disabled: false,
  });
  const [messages, setMessages] = useState<MessageType[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessagesQuery = useQuery({
    queryKey: ['getMessages'],
    queryFn: () => getMessages(channel.id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (getMessagesQuery.data) {
      setMessages([...getMessagesQuery.data]);
    }
  }, [getMessagesQuery.data]);

  const sendMessageMutation = useMutation(sendMessage);

  useEffect(() => {
    if (!channel.users) return;
    // 뒤로갔다가 채널로 다시 들어왔을 때, mute 상태인지 확인
    const myUser = channel.users.find((user) => user.id === myUserId);
    if (myUser?.isMuted) {
      setFormData((prevState) => ({
        ...prevState,
        placeholder: '30초간 조용히 상태가 되었습니다.',
        disabled: true,
      }));
    }
  }, [channel.users]);

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
    socket.on('notice', (data: NoticeType) => {
      const newNotice: MessageType = {
        id: data.id,
        isLog: true,
        text: data.text,
        createdAt: data.createdAt,
      };
      setMessages((prev) => [...prev, newNotice]);
      queryClient.refetchQueries(['getChannel', String(channel.id)]);

      data.code === NOTICE_STATUS.CHANNEL_REMOVE &&
        setFormData((prevState) => ({
          ...prevState,
          placeholder:
            '채널장이 채널을 삭제했습니다. 더 이상 대화를 할 수 없습니다.',
          disabled: true,
        }));

      const isIncludeMeInUsers = data.users.some(
        (user) => user.id === myUserId
      );
      if (isIncludeMeInUsers) {
        data.code === NOTICE_STATUS.USER_MUTE &&
          setFormData((prevState) => ({
            ...prevState,
            placeholder: '30초간 조용히 상태가 되었습니다.',
            disabled: true,
          }));
        data.code === NOTICE_STATUS.USER_UNMUTE &&
          setFormData((prevState) => ({
            ...prevState,
            placeholder: '메시지를 입력하세요',
            disabled: false,
          }));
        if (data.code === NOTICE_STATUS.USER_KICK) {
          alert(
            '채널에서 내보내졌습니다. 채널에 다시 참여할 수 있습니다. 채널 페이지로 이동합니다.'
          );
          navigate('/channel');
        }
        if (data.code === NOTICE_STATUS.USER_BAN) {
          alert(
            '채널에서 차단되었습니다. 채널에 다시 참여할 수 없습니다. 채널 페이지로 이동합니다.'
          );
          navigate('/channel');
        }
      }
    });
    return () => {
      socket.off('message');
      socket.off('notice');
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
        className="h-[80vh] overflow-y-auto"
        ref={scrollRef}
      >
        <MessageList messages={messages} myUserId={myUserId} />
      </div>
      <form onSubmit={handleSubmit} className="inline-flex w-full">
        <div className="w-10/12 flex items-center justify-center pr-2">
          <TextInput
            id="message"
            value={formData.message}
            placeholder="메시지를 입력해 주세요"
            onChange={handleChange}
            fullLength
            disabled={formData.disabled}
          />
        </div>
        <div className="w-2/12 flex items-center justify-center pl-2">
          <Button type="submit" primary fullLength>
            보내기
          </Button>
        </div>
      </form>
    </>
  );
}
