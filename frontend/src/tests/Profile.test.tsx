import React from 'react';
import { render, screen } from '@testing-library/react';
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