import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateChannelUserRole, updateChannelUserStatus } from 'api/rest.v1';
import ProfileImageWithStatus from 'components/molecule/ProfileImageWithStatus';
import Button from 'components/atoms/Button';
import GameInviteButton from 'components/molecule/GameInviteButton';
import {
  ChannelUserStatusType,
  ChannelUserType,
  CHANNEL_USER_STATUS,
  USER_ROLES,
} from 'types';
import QUERY_KEYS from 'constants/queryKeys';
import ROUTES from 'constants/routes';

interface Props {
  channelId: number;
  user: ChannelUserType;
  imageSize: number;
  myUser: ChannelUserType | null;
}

export default function ChannelUserItem({
  channelId,
  user,
  imageSize,
  myUser,
}: Props) {
  const queryClient = useQueryClient();
  const queryKey = [QUERY_KEYS.CHANNEL, String(channelId)];

  const isSelf = myUser?.id === user.id;
  const amIOwner = myUser?.role === USER_ROLES.OWNER;
  const amIAdmin = myUser?.role === USER_ROLES.ADMIN;
  const isShowSettingButtons =
    (amIOwner &&
      (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.NORMAL)) ||
    (amIAdmin && user.role === USER_ROLES.NORMAL);

  const updateChannelUserRoleMutation = useMutation({
    mutationFn: updateChannelUserRole,
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });

  const updateChannelUserStatusMutation = useMutation({
    mutationFn: updateChannelUserStatus,
    onSuccess: () => queryClient.invalidateQueries(queryKey),
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
    <li
      data-user-id={user.id}
      className="mb-2 px-2 py-2 flex items-center space-x-4"
    >
      <div className="flex-shrink-0 relative">
        <Link to={`${ROUTES.PROFILE.USER(user.id)}`}>
          <ProfileImageWithStatus
            userId={user.id}
            nickname={`${user.nickname}`}
            size={imageSize}
          />
        </Link>
      </div>
      <div className="flex-1 truncate">
        <div className="mb-1">
          <Link to={`${ROUTES.PROFILE.USER(user.id)}`}>
            <span>
              {user.role === USER_ROLES.OWNER && `🕶 `}
              {user.role === USER_ROLES.ADMIN && `👓 `}
              {user.nickname}
            </span>
          </Link>
        </div>

        {!isSelf && (
          <div className="inline-flex items-center space-x-2">
            <GameInviteButton />
            {amIOwner && (
              <>
                {user.role === USER_ROLES.ADMIN ? (
                  <Button onClick={handleClickRole} primary size="small">
                    관리자 해제
                  </Button>
                ) : (
                  <Button onClick={handleClickRole} primary size="small">
                    관리자 임명
                  </Button>
                )}
              </>
            )}
            {isShowSettingButtons && (
              <>
                <Button
                  value={CHANNEL_USER_STATUS.MUTE}
                  onClick={handleClickStatus}
                  secondary
                  size="small"
                >
                  조용히
                </Button>
                <Button
                  value={CHANNEL_USER_STATUS.KICK}
                  onClick={handleClickStatus}
                  secondary
                  size="small"
                >
                  내보내기
                </Button>
                <Button
                  value={CHANNEL_USER_STATUS.BAN}
                  onClick={handleClickStatus}
                  size="small"
                  linkStyle
                  className="text-red"
                >
                  차단하기
                </Button>{' '}
              </>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
