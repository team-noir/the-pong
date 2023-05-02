import ChannelUserItem from 'components/molecule/ChannelUserItem';
import Button from 'components/atoms/Button';
import { ChannelUserType, USER_ROLES } from 'types';

interface Props {
  channelId: number;
  users: ChannelUserType[];
  imageSize: number;
  myUser: ChannelUserType;
  isPrivate: boolean;
  onClickInvite: () => void;
}

export default function ChannelUserList({
  channelId,
  users,
  imageSize,
  myUser,
  isPrivate,
  onClickInvite,
}: Props) {
  return (
    <>
      {isPrivate && myUser.role === USER_ROLES.OWNER && (
        <div className="mb-6">
          <Button onClick={onClickInvite} secondary fullLength>
            초대하기
          </Button>
        </div>
      )}
      <ul className="flex flex-col divide-y divide-gray-dark">
        <ChannelUserItem
          channelId={channelId}
          key={myUser.id}
          user={myUser}
          imageSize={imageSize}
          myUser={myUser}
        />
        {users.map((user) => {
          return (
            <ChannelUserItem
              channelId={channelId}
              key={user.id}
              user={user}
              imageSize={imageSize}
              myUser={myUser}
            />
          );
        })}
      </ul>
    </>
  );
}
