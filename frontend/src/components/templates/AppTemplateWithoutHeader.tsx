import React from 'react';
import styles from 'assets/styles/AppTemplate.module.css';

interface Props {
  children: React.ReactElement | (React.ReactElement | boolean)[];
}

export default function AppTemplateWithoutHeader({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <main>{children}</main>
    </div>
  );
}
