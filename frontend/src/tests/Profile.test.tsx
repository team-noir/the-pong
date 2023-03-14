import { render, screen } from '@testing-library/react';
import { routes } from 'App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Profile from 'components/organisms/Profile';
import Achievements from 'components/organisms/Achievements';

describe('Component - Profile 렌더링', () => {
  test('닉네임과 프로필 사진을 보여준다', () => {
    render(<Profile id="2" />);
    screen.getByText('닉네임2');
    screen.getByAltText('profile image');
    screen.getByText('팔로우하기');
  });
  test('업적 목록을 보여준다', () => {
    render(<Achievements id="1" />);
    screen.getByText('Achievements');
    screen.getByText('업적 제목0');
  });
});
