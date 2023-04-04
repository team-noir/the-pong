import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import { UserType } from 'types/userType';
import styles from 'assets/styles/Following.module.css';

interface Props {
  users: UserType[];
  onClickUnfollow: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Following({ users, onClickUnfollow }: Props) {
  return (
    <>
      <h1>Following</h1>
      <UserList
        styles={styles}
        users={users}
        imageSize={52}
        hasStatus={true}
        buttons={[
          <Button key="button0" type="button">
            게임 초대
          </Button>,
          <Button key="button1" type="button">
            메시지 보내기
          </Button>,
          <Button key="button2" type="button" onClick={onClickUnfollow}>
            언팔로우
          </Button>,
        ]}
      />
    </>
  );
}
