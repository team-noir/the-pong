import { useUser } from 'hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { startGame, updateGameSetting } from 'api/api.v1';
import { RadioGroup } from '@headlessui/react';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import { classNames } from 'utils';
import { GameSettingType } from 'types';

interface Props {
  gameSetting: GameSettingType;
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
      <h3>모드 선택</h3>
      <GameOptionList
        count={gameSetting.modeCount}
        selectedValue={gameSetting.mode}
        onChange={handleChangeMode}
        amIOwner={amIOwner}
      />
      <h3>테마 선택</h3>
      <GameOptionList
        count={gameSetting.themeCount}
        selectedValue={gameSetting.theme}
        onChange={handleChangeTheme}
        amIOwner={amIOwner}
      />

      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <ProfileImage
            userId={myPlayer?.id}
            alt={`${myPlayer?.nickname}의 프로필 이미지`}
            size={52}
          />
          <span>{myPlayer?.nickname}</span>
          <span>{myPlayer?.level}</span>
        </div>
        <span>VS</span>
        <div className="flex flex-col items-center">
          <ProfileImage
            userId={otherPlayer?.id}
            alt={`${otherPlayer?.nickname}의 프로필 이미지`}
            size={52}
          />
          <span>{otherPlayer?.nickname}</span>
          <span>{otherPlayer?.level}</span>
        </div>
      </div>
      {!amIOwner ? (
        <p>
          {otherPlayer?.nickname}님이 게임 설정을 완료할 때까지 잠시만 기다려
          주세요.
        </p>
      ) : (
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
      className="flex gap-x-5"
      disabled={!amIOwner}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <RadioGroup.Option
            key={index}
            value={index}
            className={classNames(
              `p-2 rounded focus-visible:outline-none ${
                amIOwner && 'cursor-pointer'
              }`
            )}
          >
            {/* TODO: index를 문자열로 치환 */}
            {({ checked }) => (
              <span className={`${checked ? 'text-green' : ''}`}>{index}</span>
            )}
          </RadioGroup.Option>
        ))}
    </RadioGroup>
  );
}
