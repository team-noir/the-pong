import { ChannelUserType } from 'types/channelUserType';
import ChannelUserItem from './ChannelUserItem';

interface Props {
  styles: { readonly [key: string]: string };
  users: ChannelUserType[] | null;
  imageSize: number;
  myUser: ChannelUserType | null;
}

export default function ChannelUserList({
  styles,
  users,
  imageSize,
  myUser,
}: Props) {
  return (
    <ul className={styles.ul}>
      {users &&
        users.map((user) => {
          return (
            <ChannelUserItem
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
