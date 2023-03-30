import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  header: React.ReactElement;
  children: React.ReactElement | (React.ReactElement | boolean)[];
}

export default function AppTemplate({ header, children }: Props) {
  return (
    <>
      <header className="relative">{header}</header>
      <main className="container mx-auto max-w-xl min-h-screen py-24 px-4">
        {children}
      </main>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray lg:my-8" />
      <footer className="container mx-auto max-w-xl p-4 bg-green-200 shadow">
        <p>Footer</p>
        <nav>
          <h5 className="font-mono text-sm font-bold">development nav</h5>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/on-boarding">On Boarding</Link>
          </li>
        </nav>
      </footer>
    </>
  );
}
