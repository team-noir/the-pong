import React from 'react';

interface Props {
  children: React.ReactElement | (React.ReactElement | boolean)[];
}

export default function AppTemplateWithoutHeader({ children }: Props) {
  return <main className="container mx-auto max-w-7xl">{children}</main>;
}
