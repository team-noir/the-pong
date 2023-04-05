import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateChannelUserRole, updateChannelUserStatus } from 'api/api.v1';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import {
  ChannelUserStatusType,
  ChannelUserType,
  CHANNEL_USER_STATUS,
  USER_ROLES,
} from 'types';

interface Props {
  channelId: number;
  styles: { readonly [key: string]: string };
  user: ChannelUserType;
  imageSize: number;
  myUser: ChannelUserType | null;
}

export default function ChannelUserItem({
  channelId,
  styles,
  user,
  imageSize,
  myUser,
}: Props) {
  const queryClient = useQueryClient();
  const isSelf = myUser?.id === user.id;
  const amIOwner = myUser?.role === USER_ROLES.OWNER;

  const updateChannelUserRoleMutation = useMutation({
    mutationFn: updateChannelUserRole,
    onSuccess: () => queryClient.invalidateQueries(['getChannel', channelId]),
  });

  const updateChannelUserStatusMutation = useMutation({
    mutationFn: updateChannelUserStatus,
    onSuccess: () => queryClient.invalidateQueries(['getChannel', channelId]),
  });

  const handleClickRole = () => {
    updateChannelUserRoleMutation.mutate({
      channelId,
      userId: user.id,
      role:
        user.role === USER_ROLES.ADMIN ? USER_ROLES.NORMAL : USER_ROLES.ADMIN,
    });
  };

  const handleClickStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status = e.currentTarget.value;
    updateChannelUserStatusMutation.mutate({
      channelId,
      userId: user.id,
      status: status as ChannelUserStatusType,
    });
  };

  return (
    <li className={styles.li} data-user-id={user.id}>
      <Link to={`/profile/${user.id}`}>
        <ProfileImage
          userId={user.id}
          alt={`${user.nickname}'s profile image`}
          size={imageSize}
        />
      </Link>
      <Link to={`/profile/${user.id}`}>
        <span>
          {user.role === USER_ROLES.OWNER && `🕶`}
          {user.role === USER_ROLES.ADMIN && `👓`}
          {user.nickname}
        </span>
      </Link>
      {!isSelf && (
        <div>
          <Button type="button">게임 초대</Button>

          {amIOwner && (
            <>
              {user.role === USER_ROLES.ADMIN ? (
                <Button type="button" onClick={handleClickRole}>
                  관리자 해제
                </Button>
              ) : (
                <Button type="button" onClick={handleClickRole}>
                  관리자 임명
                </Button>
              )}
              {user.role !== USER_ROLES.OWNER && (
                <>
                  <Button
                    type="button"
                    value={CHANNEL_USER_STATUS.MUTE}
                    onClick={handleClickStatus}
                  >
                    조용히
                  </Button>
                  <Button
                    type="button"
                    value={CHANNEL_USER_STATUS.KICK}
                    onClick={handleClickStatus}
                  >
                    내보내기
                  </Button>
                  <Button
                    type="button"
                    value={CHANNEL_USER_STATUS.BAN}
                    onClick={handleClickStatus}
                  >
                    차단하기
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}
