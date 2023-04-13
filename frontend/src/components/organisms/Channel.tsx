import { useEffect, useState, useRef, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMessages, sendMessage } from 'api/api.v1';
import { SocketContext } from 'contexts/socket';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import MessageList from 'components/molecule/MessageList';
import { MessageType } from 'types';

interface Props {
  channelId: number;
  myUserId: number;
}

interface FormData {
  message: string;
}

export default function Channel({ channelId, myUserId }: Props) {
  const socket = useContext(SocketContext);

  const [formData, setFormData] = useState<FormData>({ message: '' });
  const [messages, setMessages] = useState<MessageType[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessagesQuery = useQuery({
    queryKey: ['getMessages'],
    queryFn: () => getMessages(Number(channelId)),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (getMessagesQuery.data) {
      setMessages([...getMessagesQuery.data]);
    }
  }, [getMessagesQuery.data]);

  const sendMessageMutation = useMutation(sendMessage);

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
      console.log('notice', data);
      // queryClient.refetchQueries(['getChannel', String(channelId)]);
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
      channelId: Number(channelId),
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
