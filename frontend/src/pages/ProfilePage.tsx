import React from 'react';
import Profile from 'components/organisms/Profile';

export default function ProfilePage() {
  return (
    <>
      <div>ProfilePage</div>
      <Profile
        nickname="nickname"
        profileImageUrl="https://placekitten.com/800/800"
      />
    </>
  );
}
