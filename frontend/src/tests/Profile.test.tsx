import { render, screen } from '@testing-library/react';
import { ProfileType } from 'api/api.v1';
import Profile from 'components/organisms/Profile';

describe('Component - Profile 렌더링', () => {
  const profileUser: ProfileType = {
    id: 1,
    nickname: `user1's nickname`,
    rank: 0,
    achievements: [],
    games: [],
  };

  test('닉네임과 프로필 사진을 보여준다', () => {
    render(<Profile user={profileUser} myId={'2'} />);
    screen.getByText(`user1's nickname`);
    screen.getByAltText('profile image');
    screen.getByText('팔로우하기');
  });
});
