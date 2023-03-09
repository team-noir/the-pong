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
    <button type={type} onClick={onClick}>
      {logoImageUrl && (
        <img src={logoImageUrl} alt="logo" className={styles.logo} />
      )}
      {children}
    </button>
  );
}
