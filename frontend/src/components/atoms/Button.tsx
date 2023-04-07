import React from 'react';
import { classNames } from 'utils';

interface Props {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  value?: string;
  logoImageUrl?: string;
  primary?: boolean;
  secondary?: boolean;
  fullLength?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type,
  value,
  logoImageUrl,
  primary = false,
  secondary = false,
  fullLength = false,
  onClick,
}: Props) {
  return (
    <button
      className={classNames(
        primary && 'primary',
        secondary && 'secondary',
        fullLength && 'w-full',
        'button'
      )}
      type={type}
      value={value}
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
