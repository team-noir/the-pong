import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'components/molecule/SearchBar';
import Button from 'components/atoms/Button';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types/userType';
import { useLogin } from 'hooks/useStore';
import { AxiosError } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getWhoami, postLogout } from 'api/api.v1';

export default function HeaderGnb() {
  const logout = useLogin((state) => state.logout);

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });
  const postLogoutMutation = useMutation(postLogout);

  useEffect(() => {
    if (postLogoutMutation.isSuccess) {
      logout();
    }
  }, [postLogoutMutation.isSuccess]);

  const handleLogout = () => {
    postLogoutMutation.mutate();
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
      {whoamiQuery.isSuccess && (
        <Link to={`/profile/${whoamiQuery.data.id}`}>
          <ProfileImage
            userId={whoamiQuery.data.id}
            alt="my profile image"
            size={52}
          />
        </Link>
      )}
    </>
  );
}
