import React from 'react';
import Button from 'components/atoms/Button';
import logo42 from 'assets/images/logo_42.svg';

export default function Login() {
  return (
    <>
      <h1>The Pong</h1>
      <Button type="button" logoImageUrl={logo42}>
        Login with 42
      </Button>
    </>
  );
}
