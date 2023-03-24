import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import userItemStyles from 'assets/styles/UserItem.module.css';
import { ChannelUserType, UserTypeType } from 'types/channelUserType';
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
      {myUser && user.id !== myUser.id && (
        <div>
          <Button type="button">게임 초대</Button>
          {myUser.userType <= UserTypeType.admin && (
            <>
              <Button type="button">조용히</Button>
              <Button type="button">내보내기</Button>
              <Button type="button">차단하기</Button>
            </>
          )}
          {myUser.userType === UserTypeType.owner &&
            (user.userType === UserTypeType.admin ? (
              <Button type="button">관리자 해제</Button>
            ) : (
              <Button type="button">관리자 임명</Button>
            ))}
        </div>
      )}
    </li>
  );
}
