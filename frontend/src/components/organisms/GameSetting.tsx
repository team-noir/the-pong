import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { startGame, updateGameSetting } from 'api/api.v1';
import { RadioGroup } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useUser } from 'hooks/useStore';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import GameMatchtable from 'components/molecule/GameMatchtable';
import Button from 'components/atoms/Button';
import { classNames } from 'utils';
import { GameSettingType } from 'types';

interface Props {
  gameSetting: GameSettingType;
}

export default function GameSetting({ gameSetting }: Props) {
  const myUserId = useUser((state) => state.id);
  const [isOtherUserLeft, setIsOtherUserLeft] = useState(false);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const myPlayer = gameSetting.players.find((user) => user.id === myUserId);
  const otherPlayer = gameSetting.players.find((user) => user.id !== myUserId);
  const amIOwner = !!myPlayer?.isOwner;

  const updateGameSettingMutation = useMutation(updateGameSetting);

  const startGameMutation = useMutation({
    mutationFn: startGame,
    onSuccess: () => navigate(`/game/${gameSetting.id}`),
  });

  useEffect(() => {
    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on(
      'gameSetting',
      (data: { text: string; mode?: number; theme?: number }) => {
        const { text, mode, theme } = data;
        if (text === 'change') {
          queryClient.setQueryData<GameSettingType>(
            ['gameSetting', gameSetting.id],
            (prevData) =>
              prevData &&
              ({
                ...prevData,
                mode: mode !== null ? mode : prevData.mode,
                theme: theme !== null ? theme : prevData.theme,
              } as GameSettingType)
          );
        } else if (text === 'done') {
          navigate(`/game/${gameSetting.id}`);
        } else if (text === 'leave') {
          setIsOtherUserLeft(true);
        }
      }
    );

    return () => {
      socket.off('ping');
      socket.off('gameSetting');
    };
  }, []);

  const handleChangeMode = (mode: number) => {
    updateGameSettingMutation.mutate({
      ...gameSetting,
      mode,
    });
  };

  const handleChangeTheme = (theme: number) => {
    updateGameSettingMutation.mutate({
      ...gameSetting,
      theme,
    });
  };

  return (
    <>
      <section>
        <h2 className="section-title">게임 설정</h2>
        {!amIOwner && (
          <div
            className="text-text-dark bg-gray border-t-4 border-gray-dark rounded mb-6 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <InformationCircleIcon
                  className="block h-4 w-4"
                  aria-hidden="true"
                />
              </div>
              <div className="text-sm ml-1">
                {otherPlayer?.nickname}님이 게임 설정을 완료할 때까지 잠시만
                기다려 주세요.
              </div>
            </div>
          </div>
        )}
        <div className="mb-5">
          {myPlayer && otherPlayer && (
            <GameMatchtable player1={myPlayer} player2={otherPlayer} />
          )}
        </div>

        <div className="mb-6">
          <h3 className="block text-sm font-medium w-full text-text-light mb-2">
            모드 선택
          </h3>
          <GameOptionList
            count={gameSetting.modeCount}
            selectedValue={gameSetting.mode}
            onChange={handleChangeMode}
            amIOwner={amIOwner}
          />
        </div>
        <div className="mb-6">
          <h3 className="block text-sm font-medium w-full text-text-light mb-2">
            테마 선택
          </h3>
          <GameOptionList
            count={gameSetting.themeCount}
            selectedValue={gameSetting.theme}
            onChange={handleChangeTheme}
            amIOwner={amIOwner}
          />
        </div>

        {amIOwner && (
          <Button
            primary
            fullLength
            onClick={() => startGameMutation.mutate(gameSetting.id)}
          >
            시작하기
          </Button>
        )}
      </section>

      {isOtherUserLeft && (
        <Modal onClickClose={() => navigate('/game')} fitContent>
          <div className="text-center">
            <p>상대가 퇴장했습니다.</p>
          </div>
        </Modal>
      )}
    </>
  );
}

function GameOptionList({
  count,
  selectedValue,
  onChange,
  amIOwner,
}: {
  count: number;
  selectedValue: number;
  onChange: (value: number) => void;
  amIOwner: boolean;
}) {
  return (
    <RadioGroup
      value={selectedValue}
      onChange={onChange}
      className="inline-flex flex-wrap items-center mb-2 w-full border border-gray-dark rounded"
      disabled={!amIOwner}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <RadioGroup.Option
            key={index}
            value={index}
            className={classNames(
              'flex-auto border-r last-of-type:border-none border-gray-dark rounded-none',
              amIOwner && 'cursor-pointer'
            )}
          >
            {/* TODO: index를 문자열로 치환 */}
            {({ checked }) => (
              <span
                className={classNames(
                  'block text-center text-lg py-2 px-4 w-full font-semibold select-none focus-visible:outline-none',
                  amIOwner && 'cursor-pointer',
                  checked && 'bg-gray-dark'
                )}
              >
                {index}
              </span>
            )}
          </RadioGroup.Option>
        ))}
    </RadioGroup>
  );
}
