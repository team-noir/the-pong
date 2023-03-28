import Button from 'components/atoms/Button';
import PasswordInput from 'components/atoms/PasswordInput';
import { useState } from 'react';

interface Props {
  channelId: number;
  onMatchPassword: () => void;
}

export default function ChannelPassword({ channelId, onMatchPassword }: Props) {
  const [password, setPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 비밀번호 확인 API 호출
    onMatchPassword();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>비밀번호 입력이 필요한 채널입니다.</p>
      <PasswordInput id="password" value={password} onChange={handleChange} />
      <div>
        <Button type="submit">확인</Button>
      </div>
    </form>
  );
}
