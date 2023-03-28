import React from 'react';
import styles from 'assets/styles/Button.module.css';

interface Props {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  logoImageUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Button({
  children,
  type,
  logoImageUrl,
  onClick,
}: Props) {
  return (
    <button
      className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      type={type}
      onClick={onClick}
    >
      {logoImageUrl && (
        <img
          src={logoImageUrl}
          alt="logo"
          className="fill-current w-4 h-4 mr-2"
        />
      )}
      <span>{children}</span>
    </button>
  );
}
