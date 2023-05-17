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
  textStyle?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPointerDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPointerUp?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  textStyle = false,
  size = 'medium',
  className,
  disabled = false,
  onClick,
  onPointerDown,
  onPointerUp,
}: Props) {
  return (
    <button
      className={classNames(
        primary && 'primary',
        secondary && 'secondary',
        fullLength && 'w-full',
        linkStyle && 'link',
        textStyle && 'text',
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
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {logoImageUrl && (
        <img
          src={logoImageUrl}
          alt="logo"
          className="fill-current w-4 h-4 mr-2"
        />
      )}
      {children}
    </button>
  );
}
