import React from 'react';
import styles from 'assets/styles/Button.module.css';

interface Props {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  logoImageUrl?: string;
}

export default function Button({ children, type, logoImageUrl }: Props) {
  return (
    <button type={type}>
      {logoImageUrl && (
        <img src={logoImageUrl} alt="logo" className={styles.logo} />
      )}
      {children}
    </button>
  );
}
