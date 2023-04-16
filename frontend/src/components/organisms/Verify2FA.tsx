import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { verify2fa } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';

export default function Verify2FA() {
  const { setIsTwoFactor, setIsLoggedIn } = useUser((state) => state);
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const verify2faMutation = useMutation({
    mutationFn: verify2fa,
    onSuccess: () => {
      setIsTwoFactor(true);
      setIsLoggedIn(true);
      navigate(location.state.redirectTo);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOtp(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verify2faMutation.mutate(otp);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Two-Factor Authentication</h1>
        <p>2단계 보안 인증이 설정되어 있습니다. 코드를 입력해주세요</p>
        <TextInput
          type="password"
          id="otp"
          value={otp}
          onChange={handleChange}
        />
        <div>
          <Button type="submit" primary>
            확인
          </Button>
        </div>
      </form>
    </section>
  );
}
