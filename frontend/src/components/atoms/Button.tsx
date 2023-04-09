import React from 'react';
import { classNames } from 'utils';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  logoImageUrl?: string;
  primary?: boolean;
  secondary?: boolean;
  fullLength?: boolean;
  linkStyle?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type = 'button',
  value,
  logoImageUrl,
  primary = false,
  secondary = false,
  fullLength = false,
  linkStyle = false,
  className,
  onClick,
}: Props) {
  return (
    <button
      className={classNames(
        primary && 'primary',
        secondary && 'secondary',
        fullLength && 'w-full',
        linkStyle && 'link',
        'button',
        className ? className : ''
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
