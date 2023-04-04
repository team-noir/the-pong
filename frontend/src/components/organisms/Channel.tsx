import { useEffect, useState, useRef } from 'react';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import MessageList from 'components/molecule/MessageList';
import { MessageType } from 'types';

interface Props {
  messages: MessageType[];
  postMessage: (message: string) => void;
  myUserId: number;
}

interface FormData {
  message: string;
}

export default function Channel({ messages, postMessage, myUserId }: Props) {
  const [formData, setFormData] = useState<FormData>({ message: '' });
  const scrollRef = useRef<HTMLDivElement>(null);

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
    if (!formData.message) return;
    postMessage(formData.message);
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
