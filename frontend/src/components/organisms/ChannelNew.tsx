import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createChannel } from 'api/api.v1';
import CheckboxInputWithLabel from 'components/molecule/CheckboxInputWithLabel';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import Button from 'components/atoms/Button';
import {
  validateChannelPassword,
  validateChannelTitle,
} from 'utils/validatorUtils';
import { ChannelFormType } from 'types';
import { classNames } from 'utils';
import ROUTES from 'constants/routes';

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

  const createChannelMutation = useMutation({
    mutationFn: createChannel,
    onSuccess: (data) => {
      const { id } = data;
      navigate(ROUTES.CHANNEL.ROOM(id), { replace: true });
    },
  });

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
    createChannelMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInputWithMessage
        id="title"
        label="채널 이름"
        value={formData.title || ''}
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
      <div className="mb-6">
        <div className="inline-flex items-center mb-2 w-full border border-gray-dark rounded">
          <Button
            type="button"
            onClick={() =>
              setformData((prevState) => ({
                ...prevState,
                isPrivate: false,
              }))
            }
            fullLength
            className={classNames(
              'border-r border-gray-dark rounded-none',
              !formData.isPrivate ? 'bg-gray-dark' : ''
            )}
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
            fullLength
            className={classNames(
              'border-r border-gray-dark rounded-none',
              formData.isPrivate ? 'bg-gray-dark' : ''
            )}
          >
            비공개
          </Button>
        </div>
        <div className="text-sm mb-6">
          {!formData.isPrivate ? (
            <p>공개 채널은 목록에 표시되며, 누구나 입장 가능합니다.</p>
          ) : (
            <p>비공개 채널은 채널 초대로만 입장할 수 있습니다.</p>
          )}
        </div>
      </div>
      {!formData.isPrivate && (
        <>
          <div className="my-4 border border-gray-dark rounded">
            <CheckboxInputWithLabel
              id="password-check"
              label="비밀번호 걸기"
              checked={hasPassword}
              setValue={(value) => setHasPassword(value)}
            />
          </div>
          {hasPassword && (
            <div className="mb-6">
              <TextInputWithMessage
                type="password"
                id="password"
                label="비밀번호"
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
            </div>
          )}
        </>
      )}
      <Button type="submit" primary fullLength>
        만들기
      </Button>
    </form>
  );
}
