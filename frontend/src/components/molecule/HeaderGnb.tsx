import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'components/molecule/SearchBar';
import Button from 'components/atoms/Button';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types/userType';
import { useLogin } from 'hooks/useStore';
import { API_PREFIX } from 'api/api.v1';

const dummyData = {
  id: 1,
  nickname: '닉네임1',
};

export default function HeaderGnb() {
  const logout = useLogin((state) => state.logout);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // TODO: api에서 회원 정보 가져오기
    setUser(dummyData);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav>
        <SearchBar />
        <h5>Nav to test</h5>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/on-boarding">On Boarding</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
        <li>
          <Link to="/channel">Channel</Link>
        </li>
        <li>
          <Link to="/following">Following</Link>
        </li>
        <li>
          <Link to="/profile/1">Profile</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
      <Button type="button">햄버거</Button>
      <div>로고</div>
      <Link to={`/profile/${user?.id}`}>
        <ProfileImage userId={user?.id} alt="my profile image" size={52} />
      </Link>
    </>
  );
}
