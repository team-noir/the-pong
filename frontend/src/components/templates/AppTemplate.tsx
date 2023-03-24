import React from 'react';
import styles from 'assets/styles/AppTemplate.module.css';

interface Props {
  header: React.ReactElement;
  children: React.ReactElement | (React.ReactElement | boolean)[];
}

export default function AppTemplate({ header, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>{header}</header>
      <main>{children}</main>
    </div>
  );
}
