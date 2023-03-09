import { render, screen } from '@testing-library/react';
import Following from 'components/organisms/Following';

describe('Component - Following 렌더링', () => {
  test('팔로잉 목록을 보여준다', () => {
    render(<Following />);
    screen.getByText('Following');
  });

  test('더미 데이터 목록을 보여준다', () => {
    render(<Following />);
    screen.getByText('닉네임2');
    screen.getByAltText(`닉네임2's profile image`);
    screen.getByText('닉네임3');
    screen.getByAltText(`닉네임3's profile image`);
  });
});
