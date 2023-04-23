import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { replyGameInvitation } from 'api/api.v1';
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
  const navigate = useNavigate();

  const replyGameInvitationMutation = useMutation(replyGameInvitation);

  useEffect(() => {
    socket.on(
      'gameInvite',
      (data: { text: string; user?: UserType; gameId?: number }) => {
        if (data.gameId && data.user) {
          setIsShow(true);
          setGameId(data.gameId);
          setUser(data.user);
        } else if (data.text === 'canceled') {
          setIsCanceled(true);
          setIsShow(false);
        }
      }
    );
  }, []);

  const handleClickAccept = () => {
    if (!gameId) return;

    replyGameInvitationMutation.mutate(
      { gameId, isAccepted: true },
      {
        onSuccess: () => {
          setIsShow(false);
          navigate(`/game/${gameId}/setting`);
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
      {isShow && (
        /* eslint-disable */
        <Modal onClickClose={() => {}} fitContent>
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
        <Modal onClickClose={() => setIsCanceled(false)} fitContent>
          <div className="text-center">
            <p>상대가 초대를 취소하였습니다.</p>
          </div>
        </Modal>
      )}
    </>
  );
}
