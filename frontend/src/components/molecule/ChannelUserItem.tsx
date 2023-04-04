import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import { ChannelUserType, UserRole } from 'types/channelUserType';

interface Props {
  changeRole: (arg: any) => void;
  changeStatus: (arg: any) => void;
  styles: { readonly [key: string]: string };
  user: ChannelUserType;
  imageSize: number;
  myUser: ChannelUserType | null;
}

export default function ChannelUserItem({
  changeRole,
  changeStatus,
  styles,
  user,
  imageSize,
  myUser,
}: Props) {
  const isSelf = myUser?.id === user.id;
  const amIOwner = myUser?.role === UserRole.owner;

  const handleClickRole = () => {
    changeRole({
      userId: user.id,
      role: user.role === UserRole.admin ? 'normal' : 'admin',
    });
  };

  const handleClickStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status = e.currentTarget.value;
    changeStatus({
      userId: user.id,
      status,
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
          {user.role === UserRole.owner && `🕶`}
          {user.role === UserRole.admin && `👓`}
          {user.nickname}
        </span>
      </Link>
      {!isSelf && (
        <div>
          <Button type="button">게임 초대</Button>

          {amIOwner && (
            <>
              {user.role === UserRole.admin ? (
                <Button type="button" onClick={handleClickRole}>
                  관리자 해제
                </Button>
              ) : (
                <Button type="button" onClick={handleClickRole}>
                  관리자 임명
                </Button>
              )}
              {user.role !== UserRole.owner && (
                <>
                  <Button
                    type="button"
                    value="mute"
                    onClick={handleClickStatus}
                  >
                    조용히
                  </Button>
                  <Button
                    type="button"
                    value="kick"
                    onClick={handleClickStatus}
                  >
                    내보내기
                  </Button>
                  <Button type="button" value="ban" onClick={handleClickStatus}>
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
