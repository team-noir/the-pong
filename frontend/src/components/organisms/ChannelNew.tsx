import { useMutation } from '@tanstack/react-query';
import { ChannelFormType, postNewChannel } from 'api/api.v1';
import Button from 'components/atoms/Button';
import CheckboxInputWithLabel from 'components/molecule/CheckboxInputWithLabel';
import PasswordInputWithMessage from 'components/molecule/PasswordInputWithMessage';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateChannelPassword,
  validateChannelTitle,
} from 'utils/validatorUtils';

export default function ChannelNew() {
  const [formData, setformData] = useState<ChannelFormType>({
    title: '',
    isPrivate: false,
    password: '',
  });
  const [isValidated, setIsValidated] = useState({
    title: false,
    password: true,
  });
  const [hasPassword, setHasPassword] = useState(false);
  const navigate = useNavigate();

  const postNewChannelMutation = useMutation(postNewChannel);

  useEffect(() => {
    if (!hasPassword || formData.isPrivate) {
      setformData((prevState) => ({ ...prevState, password: '' }));
      setIsValidated((prevState) => ({ ...prevState, password: true }));
    }
  }, [hasPassword, formData.isPrivate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidated.title || !isValidated.password) {
      alert('입력값을 확인해주세요.');
      return;
    }
    postNewChannelMutation.mutate(formData, {
      onError: () => {
        alert(`다시 시도해 주세요.`);
      },
      onSuccess: (data) => {
        const { id } = data;
        navigate(`/channel/${id}`);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithMessage
        id="title"
        label="채널 이름"
        value={formData.title}
        placeholder="채널 이름을 입력해주세요"
        setValue={(value) =>
          setformData((prevState) => ({ ...prevState, title: value }))
        }
        isValid={isValidated.title}
        setIsValid={(value) =>
          setIsValidated((prevState) => ({ ...prevState, title: value }))
        }
        validate={validateChannelTitle}
        message="2자 이상 25자 이하로 입력해주세요."
      />
      <div>
        <Button
          type="button"
          onClick={() =>
            setformData((prevState) => ({
              ...prevState,
              isPrivate: false,
            }))
          }
        >
          공개
        </Button>
        <Button
          type="button"
          onClick={() =>
            setformData((prevState) => ({
              ...prevState,
              isPrivate: true,
            }))
          }
        >
          비공개
        </Button>
        {!formData.isPrivate ? (
          <p>공개 채널은 목록에 표시되며, 누구나 입장 가능합니다.</p>
        ) : (
          <p>비공개 채널은 채널 초대로만 입장할 수 있습니다.</p>
        )}
      </div>
      {!formData.isPrivate && (
        <div>
          <CheckboxInputWithLabel
            id="password-check"
            label="비밀번호 걸기"
            checked={hasPassword}
            setValue={(value) => setHasPassword(value)}
          />
          {hasPassword && (
            <PasswordInputWithMessage
              id="password"
              value={formData.password || ''}
              setValue={(value) =>
                setformData((prevState) => ({
                  ...prevState,
                  password: value,
                }))
              }
              isValid={isValidated.password}
              setIsValid={(value) =>
                setIsValidated((prevState) => ({
                  ...prevState,
                  password: value,
                }))
              }
              validate={validateChannelPassword}
              message="4자 이상 10자 이하 영문 또는 숫자를 입력해주세요."
            />
          )}
        </div>
      )}
      <Button type="submit">만들기</Button>
    </form>
  );
}
