import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { verify2fa } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';
import ROUTES from 'constants/routes';

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
      onSuccess ? onSuccess() : navigate(ROUTES.MAIN);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value?.length > 6) return;
    const onlyNumber = value.replace(/\D/g, '');
    setCode(onlyNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verify2faMutation.mutate(code);
  };

  return (
    <div className="container mx-auto max-w-xl max-h-screen py-24 px-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="my-16 text-center">
          <h2 className="section-title">Two-Factor Authentication</h2>
          <p>2단계 보안 인증 코드를 입력해 주세요.</p>
          <div className="my-16 mx-auto">
            <TextInput
              id="code"
              value={code}
              onChange={handleChange}
              className="text-3xl text-center w-36 font-mono"
              placeholder="000000"
            />
          </div>
          <Button type="submit" primary fullLength>
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
