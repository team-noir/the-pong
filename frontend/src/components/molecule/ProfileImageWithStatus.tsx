import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserStatus } from 'api/api.v1';
import ProfileImage from 'components/atoms/ProfileImage';
import QUERY_KEYS from 'constants/queryKeys';
import { useEffect } from 'react';

interface Props {
  userId: number;
  nickname: string;
  size: number;
}

export default function ProfileImageWithStatus({
  userId,
  nickname,
  size,
}: Props) {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.STATUS, String(userId)],
    queryFn: () => getUserStatus(userId),
    staleTime: 0,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <ProfileImage userId={userId} nickname={nickname} size={size} />
      {data?.status && (
        <>
          {data.status === 'online' && (
            <span className="user-indicator w-3.5 h-3.5 bg-status-online"></span>
          )}
          {data.status === 'game' && (
            <span className="user-indicator w-3.5 h-3.5 bg-status-game border-2"></span>
          )}
        </>
      )}
    </>
  );
}
