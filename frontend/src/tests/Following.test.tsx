import { render, screen } from '@testing-library/react';
import Following from 'components/organisms/Following';
import { BrowserRouter } from 'react-router-dom';
import { UserType } from 'types';

const mockFollowings: UserType[] = [
  {
    id: 1,
    nickname: 'Mock Following Nickname1',
    status: 'online',
  },
  {
    id: 2,
    nickname: 'Mock Following Nickname2',
    status: 'offline',
  },
  {
    id: 3,
    nickname: 'Mock Following Nickname3',
    status: 'game',
  },
  {
    id: 4,
    nickname: 'Mock Following Nickname4',
    status: 'offline',
  },
];

describe('Component - Following 렌더링', () => {
  const handleClickUnfollow = () => console.log('Unfollowed');

  test('팔로잉 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <Following
          users={mockFollowings}
          onClickUnfollow={handleClickUnfollow}
        />
      </BrowserRouter>
    );
    screen.getByText('Following');
  });

  test('더미 데이터 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <Following
          users={mockFollowings}
          onClickUnfollow={handleClickUnfollow}
        />
      </BrowserRouter>
    );
    screen.findByText('Mock Following Nickname1');
    screen.findByAltText(`Mock Following Nickname1's profile image`);
  });
});
