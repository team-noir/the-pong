import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { routerConfig } from 'App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Profile from 'components/organisms/Profile';

describe('Component - Profile', () => {
  test('닉네임과 프로필 사진을 보여준다', () => {
    render(
      <Profile
        id="1"
        nickname="닉네임"
        profileImageUrl="https://placekitten.com/800/800"
      />
    );
    screen.getByText('닉네임');
    screen.getByAltText('profile image');
  });
});

describe('Router - ProfilePage', () => {
  test('/profile/:userId로 접근하면 해당 회원의 프로필 페이지를 보여준다', async () => {
    const route = '/profile/1';

    const router = createMemoryRouter(routerConfig, {
      initialEntries: [route],
    });

    render(<RouterProvider router={router} />);

    await screen.findByText('ProfilePage');
    screen.getByTestId('1');
  });
});
