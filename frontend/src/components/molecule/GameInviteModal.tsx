import { useContext, useEffect, useState } from 'react';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import { UserType } from 'types';

export default function GameInviteModal() {
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);
  const [isCanceled, setIsCanceled] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(
      'gameInvite',
      (data: { text: string; user?: UserType; gameId?: number }) => {
        if (data.gameId && data.user) {
          setIsShow(true);
          setGameId(gameId);
          setUser(data.user);
        } else if (data.text === 'canceled') {
          setIsCanceled(true);
          setIsShow(false);
        }
      }
    );
  }, []);

  const handleClickAccept = () => {
    // TODO: 초대 수락 API 호출 && 게임 페이지로 이동
    setIsShow(false);
  };

  const handleClickReject = () => {
    // TODO: 초대 거절 API 호출
    setIsShow(false);
  };

  return (
    <>
      {isShow && (
        <Modal onClickClose={handleClickReject} fitContent>
          <p className="flex items-center">
            <ProfileImage
              userId={user?.id}
              alt={`${user?.nickname}`}
              size={40}
            />
            <span className="ml-2">
              {user?.nickname}님이 게임에 초대하였습니다.
            </span>
          </p>
          <div className="flex justify-evenly mt-4">
            <Button primary onClick={handleClickAccept}>
              수락
            </Button>
            <Button secondary onClick={handleClickReject}>
              거절
            </Button>
          </div>
        </Modal>
      )}
      {isCanceled && (
        <Modal onClickClose={() => setIsCanceled(false)}>
          <p>상대가 초대를 취소하였습니다.</p>
        </Modal>
      )}
    </>
  );
}
