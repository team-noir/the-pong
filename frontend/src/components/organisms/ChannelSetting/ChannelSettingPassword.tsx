import Button from 'components/atoms/Button';
import CheckboxInputWithLabel from 'components/molecule/CheckboxInputWithLabel';
import PasswordInputWithMessage from 'components/molecule/PasswordInputWithMessage';
import { useEffect, useState } from 'react';
import { validateChannelPassword } from 'utils/validatorUtils';

interface Props {
  isProtected: boolean;
  onClickBack: () => void;
}

export default function ChannelSettingPassword({
  isProtected,
  onClickBack,
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
    onClickBack();
    // TODO: 서버로 데이터 전송
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Button type="button" onClick={onClickBack}>
          &lt;
        </Button>
        <h2>채널 비밀번호 수정</h2>
      </div>
      <CheckboxInputWithLabel
        id="password-check"
        label="비밀번호 걸기"
        checked={hasPassword}
        setValue={(value) => setHasPassword(value)}
      />
      <div>
        {!isProtected && hasPassword && (
          <ChannelPasswordInput
            password={password}
            setValue={setPassword}
            isValid={isValid}
            setIsValid={setIsValid}
          />
        )}
        {isProtected && hasPassword && (
          <>
            <p>비밀번호를 잊어버렸다면 재설정하세요.</p>
            {!isShowResetInput ? (
              <Button type="button" onClick={() => setIsShowResetInput(true)}>
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
          </>
        )}
      </div>
      <Button type="submit">저장하기</Button>
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
    <PasswordInputWithMessage
      id="password"
      value={password}
      setValue={(value) => setValue(value)}
      isValid={isValid}
      setIsValid={(value) => setIsValid(value)}
      validate={validateChannelPassword}
      message="4자 이상 10자 이하 영문 또는 숫자를 입력해주세요."
    />
  );
}