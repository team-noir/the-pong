import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import MessageList from 'components/molecule/MessageList';
import { useEffect, useState } from 'react';
import { ChannelType } from 'types/channelType';

interface Props {
  channel: ChannelType;
}

interface FormData {
  message: string;
}

export interface DummyMessageType {
  id: number;
  userId: string;
  nickname: string;
  profileImageUrl: string;
  text: string;
  createdAt: string;
}

let dummyId = 0;
const dummyMessages: DummyMessageType[] = [
  {
    id: dummyId++,
    userId: '0',
    nickname: 'sarchoi',
    profileImageUrl: 'https://placekitten.com/800/800',
    text: '안녕하세요',
    createdAt: '2023-03-17T00:14:35.000Z',
  },
  {
    id: dummyId++,
    userId: '0',
    nickname: 'sarchoi',
    profileImageUrl: 'https://placekitten.com/800/800',
    text: '반가워요~~~',
    createdAt: '2023-03-17T00:14:36.000Z',
  },
  {
    id: dummyId++,
    userId: '1',
    nickname: 'heehkim',
    profileImageUrl: 'https://placekitten.com/800/800',
    text: '안녕하세요~!',
    createdAt: '2023-03-17T00:14:37.000Z',
  },
  {
    id: dummyId++,
    userId: '1',
    nickname: 'heehkim',
    profileImageUrl: 'https://placekitten.com/800/800',
    text: '방가방가',
    createdAt: '2023-03-17T00:14:38.000Z',
  },
  {
    id: dummyId++,
    userId: '2',
    nickname: 'cpak',
    profileImageUrl: 'https://placekitten.com/800/800',
    text: '반갑습니다',
    createdAt: '2023-03-17T00:14:39.000Z',
  },
];

export default function Channel({ channel }: Props) {
  const [messages, setMessages] = useState<DummyMessageType[] | null>(null);
  const [formData, setFormData] = useState<FormData>({ message: '' });

  useEffect(() => {
    // TODO: 채널 메시지 API에서 가져오기
    setMessages(dummyMessages);
  }, []);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setFormData({ ...formData, message: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 메시지를 보내는 API 호출
  };

  return (
    <>
      <div>
        <MessageList messages={messages} />
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
