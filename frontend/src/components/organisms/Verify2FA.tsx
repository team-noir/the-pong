import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { verify2fa } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';

interface Props {
  onSuccess?: () => void;
}

export default function Verify2FA({ onSuccess }: Props) {
  const { setIsTwoFactor, setIsVerifiedTwoFactor } = useUser((state) => state);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const verify2faMutation = useMutation({
    mutationFn: verify2fa,
    onSuccess: () => {
      setIsTwoFactor(true);
      setIsVerifiedTwoFactor(true);
      onSuccess ? onSuccess() : navigate('/');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCode(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verify2faMutation.mutate(code);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Two-Factor Authentication</h1>
        <p>2단계 보안 인증 코드를 입력해 주세요.</p>
        <TextInput id="code" value={code} onChange={handleChange} />
        <div>
          <Button type="submit" primary>
            확인
          </Button>
        </div>
      </form>
    </section>
  );
}
