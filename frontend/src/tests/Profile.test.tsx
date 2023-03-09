import { render, screen } from '@testing-library/react';
import { routes } from 'App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Profile from 'components/organisms/Profile';

describe('Component - Profile', () => {
  test('닉네임과 프로필 사진을 보여준다', () => {
    render(<Profile id="2" />);
    screen.getByText('닉네임2');
    screen.getByAltText('profile image');
    screen.getByText('팔로우하기');
  });
});

describe('Router - ProfilePage', () => {
  test('/profile/:userId로 접근하면 해당 회원의 프로필 페이지를 보여준다', async () => {
    const route = '/profile/1';

    const router = createMemoryRouter(routes(true), {
      initialEntries: [route],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText('ProfilePage');
    await screen.findByTestId('1');
    await screen.findByText('프로필 수정하기');
  });
});
