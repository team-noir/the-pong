import React from 'react';
import { UserType } from 'types/userType';
import styles from 'assets/styles/Profile.module.css';

interface Props extends UserType {
  nickname: string;
  profileImageUrl: string;
}

export default function Profile({ id, nickname, profileImageUrl }: Props) {
  return (
    <>
      <h1>Profile</h1>
      <img src={profileImageUrl} alt="profile image" className={styles.img} />
      <p data-testid={id}>{nickname}</p>
    </>
  );
}
