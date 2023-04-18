import { anonymousLogin, API_LOGIN_FT } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import Button from 'components/atoms/Button';
import logo42 from 'assets/images/logo_42.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Login() {
  const isLogin = useUser((state) => state.isLogin);
  const queryClient = useQueryClient();

  const anonymousLoginMutation = useMutation(anonymousLogin);

  const handleClick = () => {
    window.location.href = API_LOGIN_FT;
  };

  return (
    <>
      <h1>The Pong</h1>
      <p>isLogin: {isLogin.toString()}</p>
      <Button logoImageUrl={logo42} onClick={handleClick} primary>
        42로 로그인하기
      </Button>
      {/* TODO: 익명 로그인 버튼 삭제 */}
      <Button
        onClick={() => {
          anonymousLoginMutation.mutate();
          queryClient.invalidateQueries(['whoami']);
        }}
        linkStyle
      >
        로그인 없이 둘러보기
      </Button>
    </>
  );
}
