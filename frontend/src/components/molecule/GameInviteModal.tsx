import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { replyGameInvitation } from 'api/rest.v1';
import { onGameInvite } from 'api/socket.v1';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import { UserType } from 'types';
import ROUTES from 'constants/routes';
import { GAME_INVITE_TEXT } from 'constants/index';
import SOCKET_EVENTS from 'constants/socketEvents';

export default function GameInviteModal() {
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);
  const [isCanceled, setIsCanceled] = useState(false);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const replyGameInvitationMutation = useMutation(replyGameInvitation);

  useEffect(() => {
    onGameInvite((data: { text: string; user?: UserType; gameId?: number }) => {
      if (data.gameId && data.user) {
        setIsShow(true);
        setGameId(data.gameId);
        setUser(data.user);
      } else if (data.text === GAME_INVITE_TEXT.CANCELED) {
        setIsCanceled(true);
        setIsShow(false);
      }
    });

    return () => {
      socket.off(SOCKET_EVENTS.GAME.INVITE);
    };
  }, []);

  const handleClickAccept = () => {
    if (!gameId) return;

    replyGameInvitationMutation.mutate(
      { gameId, isAccepted: true },
      {
        onSuccess: () => {
          setIsShow(false);
          navigate(ROUTES.GAME.SETTING(gameId));
        },
      }
    );
  };

  const handleClickReject = () => {
    if (!gameId) return;

    replyGameInvitationMutation.mutate(
      { gameId, isAccepted: false },
      {
        onSuccess: () => setIsShow(false),
      }
    );
  };

  return (
    <>
      {isShow && user && (
        /* eslint-disable */
        <Modal onClickClose={() => {}} isShowClose={false} fitContent>
          <div className="flex flex-col">
            <p className="flex items-center">
              <ProfileImage
                userId={user.id}
                nickname={`${user.nickname}`}
                size={40}
              />
              <span className="ml-2">
                {user.nickname}님이 게임에 초대하였습니다.
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
          </div>
        </Modal>
      )}
      {isCanceled && (
        <Modal onClickClose={() => setIsCanceled(false)} fitContent>
          <div className="text-center">
            <p>상대가 초대를 취소하였습니다.</p>
          </div>
        </Modal>
      )}
    </>
  );
}
