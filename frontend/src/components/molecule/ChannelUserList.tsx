import Button from 'components/atoms/Button';
import { ChannelUserType } from 'types/channelUserType';
import ChannelUserItem from './ChannelUserItem';

interface Props {
  changeRole: (arg: any) => void;
  changeStatus: (arg: any) => void;
  styles: { readonly [key: string]: string };
  users: ChannelUserType[] | null;
  imageSize: number;
  myUser: ChannelUserType | null;
  isPrivate: boolean;
  onClickInvite: () => void;
}

export default function ChannelUserList({
  changeRole,
  changeStatus,
  styles,
  users,
  imageSize,
  myUser,
  isPrivate,
  onClickInvite,
}: Props) {
  return (
    <ul className={styles.ul}>
      {isPrivate && (
        <Button type="button" onClick={onClickInvite}>
          초대하기
        </Button>
      )}
      {myUser && (
        <ChannelUserItem
          changeRole={changeRole}
          changeStatus={changeStatus}
          key={myUser?.id}
          styles={styles}
          user={myUser}
          imageSize={imageSize}
          myUser={myUser}
        />
      )}
      {users &&
        users.map((user) => {
          return (
            <ChannelUserItem
              changeRole={changeRole}
              changeStatus={changeStatus}
              key={user.id}
              styles={styles}
              user={user}
              imageSize={imageSize}
              myUser={myUser}
            />
          );
        })}
    </ul>
  );
}
