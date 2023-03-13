import { render, screen } from '@testing-library/react';
import Setting2FA from 'components/organisms/Setting2FA';

describe('Component - Setting2FA 렌더링', () => {
  test('2FA 설정하는 페이지를 보여준다', () => {
    render(<Setting2FA />);
    screen.getByText('Two-Factor Authentication (2FA)');
  });
});
