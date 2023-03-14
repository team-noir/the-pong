import { render, screen } from '@testing-library/react';
import Achievements from 'components/organisms/Achievements';

describe('Component - Achievements 렌더링', () => {
  test('업적 목록을 보여준다', () => {
    render(<Achievements id="1" />);
    screen.getByText('Achievements');
    screen.getByText('업적 제목0');
  });
});
