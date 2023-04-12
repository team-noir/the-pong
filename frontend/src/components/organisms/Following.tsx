import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import { UserType } from 'types';

interface Props {
  users: UserType[];
  onClickUnfollow: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Following({ users, onClickUnfollow }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">팔로잉</h2>
      <UserList
        users={users}
        imageSize={52}
        hasStatus={true}
        buttons={[
          <Button key="button0" primary size="small">
            게임 초대
          </Button>,
          <Button key="button1" primary size="small">
            메시지 보내기
          </Button>,
          <Button
            key="button2"
            onClick={onClickUnfollow}
            linkStyle
            className="text-red"
            size="small"
          >
            언팔로우
          </Button>,
        ]}
      />
    </section>
  );
}
