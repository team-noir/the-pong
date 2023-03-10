import React from 'react';
import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import Profile from 'components/organisms/Profile';
import { UserType } from 'types/userType';

interface LoaderData {
  user: UserType;
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params?.userId) {
    throw new Error('userId is required');
  }

  const user: UserType = {
    id: params.userId,
  };

  return { user };
}

export default function ProfilePage() {
  const { user }: LoaderData = useLoaderData() as LoaderData;

  return (
    <>
      <div>ProfilePage</div>
      <Profile id={user.id} />
    </>
  );
}
