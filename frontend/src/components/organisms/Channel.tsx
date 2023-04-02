import { useEffect, useState, useContext, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import MessageList from 'components/molecule/MessageList';
import { AxiosError } from 'axios';
import { SocketContext } from 'contexts/socket';
import { getChannelMessages, postChannelMessages } from 'api/api.v1';
import { ChannelType } from 'types/channelType';
import { MessageType } from 'types/messageType';
interface Props {
  channel: ChannelType | null;
}

interface FormData {
  message: string;
}

export default function Channel({ channel }: Props) {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [formData, setFormData] = useState<FormData>({ message: '' });
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const channelId = channel?.id;
  useEffect(() => {
    if (channelId) {
      getChannelMessagesMutation.mutate(channelId);
    }
  }, [channelId]);

  useEffect(() => {
    if (getChannelMessagesMutation.data) {
      setMessages(getChannelMessagesMutation.data);
    }
  }, [getChannelMessagesMutation.data]);

  useEffect(() => {
    socket.on('message', (data: any) => {
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
    socket.on('notice', (data: any) => {
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setFormData({ ...formData, message: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (channelId === undefined) return;

    postChannelMessagesMutation.mutate({
      channelId,
      message: formData.message,
    });
    setFormData({ message: '' });
  };

  return (
    <>
      <div
        id="message-list-wrapper"
        className="h-[80vh] overflow-y-auto"
        ref={scrollRef}
      >
        {getChannelMessagesMutation.isLoading && <div>메시지 로딩중...</div>}
        {getChannelMessagesMutation.isError && (
          <div>메시지를 불러오는데 실패했습니다.</div>
        )}
        {getChannelMessagesMutation.isSuccess && (
          <MessageList messages={messages} />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="message"
          value={formData.message}
          placeholder="메시지를 입력해 주세요"
          onChange={handleChange}
        />
        <Button type="submit">보내기</Button>
      </form>
    </>
  );
}
