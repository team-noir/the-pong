import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from 'components/organisms/Login';

describe('Component - Login', () => {
  test('42 로그인 버튼을 보여준다', () => {
    render(<Login />);
    screen.getByText('Login with 42');
  });
});
