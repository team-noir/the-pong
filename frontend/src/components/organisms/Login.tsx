import React from 'react';
import { useLogin } from 'hooks/useStore';
import Button from 'components/atoms/Button';
import logo42 from 'assets/images/logo_42.svg';

export default function Login() {
  const isLogin = useLogin((state) => state.isLogin);
  const login = useLogin((state) => state.login);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    login();
  };

  return (
    <>
      <h1>The Pong</h1>
      <p>isLogin: {isLogin.toString()}</p>
      <Button type="button" logoImageUrl={logo42} onClick={handleClick}>
        Login with 42
      </Button>
    </>
  );
}
