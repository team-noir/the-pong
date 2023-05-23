import { useQuery } from '@tanstack/react-query';
import { getUserStatus } from 'api/rest.v1';
import ProfileImage from 'components/atoms/ProfileImage';
import QUERY_KEYS from 'constants/queryKeys';

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
    suspense: false,
  });

  return (
    <div className="relative">
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
    </div>
  );
}
