import { useEffect, useState } from 'react';
import { useUser } from 'hooks/useStore';
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
  const [formData, setFormData] = useState({
    mode: gameSetting.mode,
    theme: gameSetting.theme,
  });

  const myPlayer = gameSetting.players.find((user) => user.id === myUserId);
  const otherPlayer = gameSetting.players.find((user) => user.id !== myUserId);
  const amIOwner = !!myPlayer?.isOwner;

  useEffect(() => {
    // TODO: 게임 설정 변경 API 호출
  }, [formData]);

  return (
    <section>
      <h2 className="section-title">게임 설정</h2>
      <h3>모드 선택</h3>
      <GameOptionList
        values={gameSetting.modes}
        selectedValue={formData.mode}
        setValue={(value: string) =>
          setFormData((prevState) => ({ ...prevState, mode: value }))
        }
        amIOwner={amIOwner}
      />
      <h3>테마 선택</h3>
      <GameOptionList
        values={gameSetting.themes}
        selectedValue={formData.theme}
        setValue={(value: number) =>
          setFormData((prevState) => ({ ...prevState, theme: value }))
        }
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
      {!amIOwner && (
        <p>
          {otherPlayer?.nickname}님이 게임 설정을 완료할 때까지 잠시만 기다려
          주세요.
        </p>
      )}
      {/* TODO: 게임 시작 API 호출 */}
      <Button primary fullLength>
        시작하기
      </Button>
    </section>
  );
}

function GameOptionList({
  values,
  selectedValue,
  setValue,
  amIOwner,
}: {
  values: string[] | number[];
  selectedValue: string | number;
  setValue: ((value: string) => void) | ((value: number) => void);
  amIOwner: boolean;
}) {
  return (
    <RadioGroup
      value={selectedValue}
      onChange={setValue}
      className="flex gap-x-5"
      disabled={!amIOwner}
    >
      {values.map((value) => (
        <RadioGroup.Option
          key={value}
          value={value}
          className={classNames(
            `p-2 rounded focus-visible:outline-none ${
              amIOwner && 'cursor-pointer'
            }`
          )}
        >
          {({ checked }) => (
            <span className={`${checked ? 'text-green' : ''}`}>{value}</span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
