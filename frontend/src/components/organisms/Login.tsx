import { useLogin } from 'hooks/useStore';
import Button from 'components/atoms/Button';
import logo42 from 'assets/images/logo_42.svg';

export default function Login() {
  const isLogin = useLogin((state) => state.isLogin);

  const handleClick = () => {
    window.location.href = '/api/v1/users/42';
  };

  return (
    <>
      <h1>The Pong</h1>
      <p>isLogin: {isLogin.toString()}</p>
      <Button type="button" logoImageUrl={logo42} onClick={handleClick}>
        42로 로그인하기
      </Button>
    </>
  );
}
