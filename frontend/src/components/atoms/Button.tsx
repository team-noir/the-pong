import React from 'react';

interface Props {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  logoImageUrl?: string;
  primary?: boolean;
  secondary?: boolean;
  fullLength?: boolean;

  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const test = `${true && 'tes'} aaa`;

export default function Button({
  children,
  type,
  logoImageUrl,
  primary = false,
  secondary = false,
  fullLength = false,
  onClick,
}: Props) {
  return (
    <button
      className={`${
        primary ? 'bg-primary hover:bg-primary-dark text-gray-darker' : ''
      }
      ${
        secondary
          ? 'text-primary hover:text-primary-dark border border-primary hover:border-primary-dark'
          : ''
      }
      ${fullLength ? 'w-full' : ''}
      font-bold py-2 px-4 rounded inline-flex items-center justify-center`}
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
