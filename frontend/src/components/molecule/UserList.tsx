import { ReactElement } from 'react';
import UserItem from 'components/molecule/UserItem';
import { UserType } from 'types';

interface Props {
  users: UserType[] | null;
  imageSize: number;
  buttons?: ReactElement[];
  hasStatus?: boolean;
  myUserId?: number;
  inviteList?: boolean;
}

export default function UserList({
  users,
  imageSize,
  buttons,
  hasStatus = false,
  myUserId,
  inviteList = false,
}: Props) {
  return (
    <ul className="flex flex-col divide-y divide-gray-dark">
      {users &&
        users.map((user) => {
          return (
            <UserItem
              key={user.id}
              user={user}
              imageSize={imageSize}
              buttons={buttons}
              hasStatus={hasStatus}
              myUserId={myUserId}
              inviteList={inviteList}
            />
          );
        })}
    </ul>
  );
}
