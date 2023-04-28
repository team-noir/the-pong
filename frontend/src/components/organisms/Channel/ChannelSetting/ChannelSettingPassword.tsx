import { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import CheckboxInputWithLabel from 'components/molecule/CheckboxInputWithLabel';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import Button from 'components/atoms/Button';
import { validateChannelPassword } from 'utils/validatorUtils';

interface Props {
  isProtected: boolean;
  onClickBack: () => void;
  onSubmit: (password: string) => void;
}

export default function ChannelSettingPassword({
  isProtected,
  onClickBack,
  onSubmit,
}: Props) {
  const [password, setPassword] = useState<string>('');
  const [hasPassword, setHasPassword] = useState(isProtected);
  const [isShowResetInput, setIsShowResetInput] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (hasPassword) return;

    setPassword('');
    setIsValid(true);
  }, [hasPassword]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ChevronLeftIcon
        className="absolute top-4 left-4 block h-6 w-6"
        aria-hidden="true"
        onClick={onClickBack}
      />
      <h3 className="section-title">
        <h2>채널 비밀번호 수정</h2>
      </h3>
      <div className="mb-16">
        <div className="my-4 border border-gray-dark rounded">
          <CheckboxInputWithLabel
            id="password-check"
            label="비밀번호 걸기"
            checked={hasPassword}
            setValue={(value) => setHasPassword(value)}
          />
        </div>

        {!isProtected && hasPassword && (
          <div className="mb-6">
            <ChannelPasswordInput
              password={password}
              setValue={setPassword}
              isValid={isValid}
              setIsValid={setIsValid}
            />
          </div>
        )}
        {isProtected && hasPassword && (
          <div className="mb-6">
            <p className="mb-4">비밀번호를 잊어버렸다면 재설정하세요.</p>
            {!isShowResetInput ? (
              <Button
                onClick={() => setIsShowResetInput(true)}
                primary
                fullLength
              >
                비밀번호 재설정
              </Button>
            ) : (
              <ChannelPasswordInput
                password={password}
                setValue={setPassword}
                isValid={isValid}
                setIsValid={setIsValid}
              />
            )}
          </div>
        )}
      </div>
      <Button type="submit" primary fullLength>
        저장하기
      </Button>
    </form>
  );
}

interface PasswordInputProps {
  password: string;
  setValue: (value: string) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
}

function ChannelPasswordInput({
  password,
  setValue,
  isValid,
  setIsValid,
}: PasswordInputProps) {
  return (
    <TextInputWithMessage
      type="password"
      id="password"
      label="비밀번호"
      value={password}
      setValue={(value) => setValue(value)}
      isValid={isValid}
      setIsValid={(value) => setIsValid(value)}
      validate={validateChannelPassword}
      message="4자 이상 10자 이하 영문 또는 숫자를 입력해주세요."
    />
  );
}
