import { render, screen } from '@testing-library/react';
import Following from 'components/organisms/Following';
import { BrowserRouter } from 'react-router-dom';

describe('Component - Following 렌더링', () => {
  test('팔로잉 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <Following />
      </BrowserRouter>
    );
    screen.getByText('Following');
  });

  test('더미 데이터 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <Following />
      </BrowserRouter>
    );
    screen.findByText('닉네임2');
    screen.findByAltText(`닉네임2's profile image`);
    screen.findByText('닉네임3');
    screen.findByAltText(`닉네임3's profile image`);
  });
});
