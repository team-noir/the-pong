import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import userItemStyles from 'assets/styles/UserItem.module.css';
import { ChannelUserType, RoleType } from 'types/channelUserType';
import Button from 'components/atoms/Button';

interface Props {
  styles: { readonly [key: string]: string };
  user: ChannelUserType;
  imageSize: number;
  myUser: ChannelUserType | null;
}

export default function ChannelUserItem({
  styles,
  user,
  imageSize,
  myUser,
}: Props) {
  const isSelf = myUser?.id === user.id;

  return (
    <li className={styles.li} data-user-id={user.id}>
      <Link to={`/profile/${user.id}`}>
        <div className={userItemStyles.container}>
          <ProfileImage
            userId={user.id}
            alt={`${user.nickname}'s profile image`}
            size={imageSize}
          />
        </div>
      </Link>
      <Link to={`/profile/${user.id}`}>
        <span>{user.nickname}</span>
      </Link>
      {!isSelf && (
        <>
          {myUser?.role === RoleType.normal ? (
            <Button type="button">게임 초대</Button>
          ) : (
            <div>
              <Button type="button">게임 초대</Button>
              {myUser?.role === RoleType.owner &&
                (user.role === RoleType.admin ? (
                  <Button type="button">관리자 해제</Button>
                ) : (
                  <Button type="button">관리자 임명</Button>
                ))}
              {user.role !== RoleType.owner && (
                <>
                  <Button type="button">조용히</Button>
                  <Button type="button">내보내기</Button>
                  <Button type="button">차단하기</Button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </li>
  );
}
