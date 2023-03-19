import { ReactElement } from 'react';
import UserItem from 'components/molecule/UserItem';
import { UserType } from 'types/userType';
import { DummyChannelUserType } from 'components/organisms/ChannelSetting';

interface Props {
  styles: { readonly [key: string]: string };
  users: UserType[] | DummyChannelUserType[] | null;
  imageSize: number;
  buttons?: ReactElement[];
  hasStatus?: boolean;
  myUserId?: string;
}

export default function UserList({
  styles,
  users,
  imageSize,
  buttons,
  hasStatus = false,
  myUserId,
}: Props) {
  return (
    <ul className={styles.ul}>
      {users &&
        users.map((user) => {
          return (
            <UserItem
              key={user.id}
              styles={styles}
              user={user}
              imageSize={imageSize}
              buttons={buttons}
              hasStatus={hasStatus}
              myUserId={myUserId}
            />
          );
        })}
    </ul>
  );
}
