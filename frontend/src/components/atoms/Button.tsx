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
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  size = 'medium',
  className,
  disabled = false,
  onClick,
  onMouseDown,
  onMouseUp,
}: Props) {
  return (
    <button
      className={classNames(
        primary && 'primary',
        secondary && 'secondary',
        fullLength && 'w-full',
        linkStyle && 'link',
        'button',
        size === 'small' && 'small',
        size === 'medium' && 'medium',
        size === 'large' && 'large',
        className ? className : ''
      )}
      type={type}
      value={value}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
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
