import { API_LOGIN_FT } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import Button from 'components/atoms/Button';
import logo42 from 'assets/images/logo_42.svg';

export default function Login() {
  const isLogin = useUser((state) => state.isLogin);

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
    </>
  );
}
