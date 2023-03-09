import React from 'react';
import { useLogin } from 'hooks/useStore';
import { Link, Outlet } from 'react-router-dom';
import Button from 'components/atoms/Button';

export default function Root() {
  const logout = useLogin((state) => state.logout);

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    logout();
  };

  return (
    <>
      <nav>
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
          <Link to="/profile/1">Profile</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
      {/* Header */}
      {/* Footer */}
      <Outlet />
    </>
  );
}
