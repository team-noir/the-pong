import ChannelUserItem from 'components/molecule/ChannelUserItem';
import Button from 'components/atoms/Button';
import { ChannelUserType } from 'types';

interface Props {
  channelId: number;
  styles: { readonly [key: string]: string };
  users: ChannelUserType[] | null;
  imageSize: number;
  myUser: ChannelUserType | null;
  isPrivate: boolean;
  onClickInvite: () => void;
}

export default function ChannelUserList({
  channelId,
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
          channelId={channelId}
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
              channelId={channelId}
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
