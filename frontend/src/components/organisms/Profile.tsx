import { useState, useEffect } from 'react';
import { UserType } from 'types/userType';
import styles from 'assets/styles/Profile.module.css';
import Button from 'components/atoms/Button';
import { Link, useParams } from 'react-router-dom';

const dummyMyData = {
  id: '1',
  nickname: '닉네임1',
  profileImageUrl: 'https://placekitten.com/800/800',
};

const dummyUserData = {
  id: '2',
  nickname: '닉네임2',
  profileImageUrl: 'https://placekitten.com/800/800',
};

export default function Profile({ id }: UserType) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMyPage, setIsMyPage] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    // TODO: api에서 회원 정보 가져오기
    if (userId === dummyMyData.id) {
      setUser(dummyMyData);
      setIsMyPage(true);
      return;
    }
    setUser(dummyUserData);
    setIsMyPage(false);
  }, [userId]);

  return (
    <>
      <h1>Profile</h1>
      <img
        src={user?.profileImageUrl}
        alt="profile image"
        className={styles.img}
      />
      <p data-testid={id}>{user?.nickname}</p>
      {isMyPage && <Link to="/setting">프로필 수정하기</Link>}
      {!isMyPage && (
        <div>
          <Button type="button">팔로우하기</Button>
          <Button type="button">차단하기</Button>
        </div>
      )}
    </>
  );
}
