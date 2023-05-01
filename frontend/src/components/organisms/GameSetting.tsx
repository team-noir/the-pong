import { useUser } from 'hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { startGame, updateGameSetting } from 'api/api.v1';
import { RadioGroup } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import GameMatchtable from 'components/molecule/GameMatchtable';
import Button from 'components/atoms/Button';
import { classNames } from 'utils';
import { GameType } from 'types';
import { GAME_MODES, GAME_THEMES } from 'constants/index';

interface Props {
  gameSetting: GameType;
}

export default function GameSetting({ gameSetting }: Props) {
  const myUserId = useUser((state) => state.id);
  const navigate = useNavigate();

  const myPlayer = gameSetting.players.find((user) => user.id === myUserId);
  const otherPlayer = gameSetting.players.find((user) => user.id !== myUserId);
  const amIOwner = !!myPlayer?.isOwner;

  const updateGameSettingMutation = useMutation(updateGameSetting);

  const startGameMutation = useMutation({
    mutationFn: startGame,
    onSuccess: () => navigate(`/game/${gameSetting.id}`),
  });

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
          type="mode"
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
          type="theme"
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
  );
}

function GameOptionList({
  type,
  selectedValue,
  onChange,
  amIOwner,
}: {
  type: string;
  selectedValue: number;
  onChange: (value: number) => void;
  amIOwner: boolean;
}) {
  const options = type === 'mode' ? GAME_MODES : GAME_THEMES;

  return (
    <RadioGroup
      value={selectedValue}
      onChange={onChange}
      className="inline-flex flex-wrap items-center mb-2 w-full border border-gray-dark rounded"
      disabled={!amIOwner}
    >
      {options.map((option, index) => (
        <RadioGroup.Option
          key={index}
          value={index}
          className={classNames(
            'flex-auto border-r last-of-type:border-none border-gray-dark rounded-none',
            amIOwner && 'cursor-pointer'
          )}
        >
          {({ checked }) => (
            <span
              className={classNames(
                'block text-center text-lg py-2 px-4 w-full font-semibold select-none focus-visible:outline-none',
                amIOwner && 'cursor-pointer',
                checked && 'bg-gray-dark'
              )}
            >
              {option.name}
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
