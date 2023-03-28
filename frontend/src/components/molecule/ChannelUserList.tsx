import Button from 'components/atoms/Button';
import { ChannelUserType } from 'types/channelUserType';
import ChannelUserItem from './ChannelUserItem';

interface Props {
  styles: { readonly [key: string]: string };
  users: ChannelUserType[] | null;
  imageSize: number;
  myUser: ChannelUserType | null;
  isPrivate: boolean;
  onClickInvite: () => void;
}

export default function ChannelUserList({
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
