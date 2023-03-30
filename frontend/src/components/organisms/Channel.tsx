import { useQuery } from '@tanstack/react-query';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';
import MessageList from 'components/molecule/MessageList';
import { useState } from 'react';
import { ChannelType } from 'types/channelType';
import { AxiosError } from 'axios';
import { getChannelMessages } from '../../api/api.v1';

interface Props {
  channel: ChannelType | null;
}

interface FormData {
  message: string;
}

export interface MessageType {
  id: number;
  senderId: number;
  senderNickname?: string;
  isLog: boolean;
  text: string;
  createdAt: string;
}

export default function Channel({ channel }: Props) {
  const [formData, setFormData] = useState<FormData>({ message: '' });

  const getChannelMessagesQuery = useQuery<MessageType[], AxiosError>({
    queryKey: ['channel', channel?.id, 'messages'],
    queryFn: () => getChannelMessages(channel?.id ?? 0), // TODO: optional chaining
    enabled: !!channel?.id,
  });

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
        {getChannelMessagesQuery.isLoading && <div>메시지 로딩중...</div>}
        {getChannelMessagesQuery.isError && (
          <div>메시지를 불러오는데 실패했습니다.</div>
        )}
        {getChannelMessagesQuery.isSuccess && (
          <MessageList messages={getChannelMessagesQuery.data} />
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
