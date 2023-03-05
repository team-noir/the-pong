import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Root() {
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
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
      </nav>
      {/* Header */}
      {/* Footer */}
      <Outlet />
    </>
  );
}
