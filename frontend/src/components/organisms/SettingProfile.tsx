import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_PREFIX, checkProfile } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import FileInputWithImage from 'components/molecule/FileInputWithImage';
import Button from 'components/atoms/Button';
import { validateNickname } from 'utils/validatorUtils';
import { ProfileFormType } from 'types';

interface Props {
  onSubmit: (userFormData: ProfileFormType) => void;
}

export default function SettingProfile({ onSubmit }: Props) {
  const { id: myUserId, nickname: myUserNickname } = useUser((state) => state);
  const [userFormData, setUserFormData] = useState<ProfileFormType>({
    nickname: '',
    imageFile: null,
  });
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);

  const checkProfileMutation = useMutation({
    mutationFn: checkProfile,
    onSuccess: (data) => {
      setIsAvailableNickname(data.nickname);
    },
  });

  useEffect(() => {
    if (!myUserNickname) return;

    const nickname = myUserNickname;
    setUserFormData((prevState) => ({
      ...prevState,
      nickname,
    }));
    setIsValidNickname(validateNickname(nickname));
  }, [myUserNickname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setUserFormData((prevState) => ({
      ...prevState,
      imageFile: files[0],
    }));
  };

  const handleClickFileRemove = () => {
    setUserFormData((prevState) => ({
      ...prevState,
      imageFile: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidNickname || !isAvailableNickname) return;
    onSubmit(userFormData);
  };

  const checkNicknameAvailable = (value: string) => {
    if (!isValidNickname || value === myUserNickname) return false;
    checkProfileMutation.mutate({ nickname: value });
  };

  return (
    <div className="container max-w-xl px-0 sm:px-4 lg:px-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <FileInputWithImage
          imageUrl={`${API_PREFIX}/users/${myUserId}/profile-image`}
          onChange={handleFileChange}
          onClickRemove={handleClickFileRemove}
        />
        <TextInputWithMessage
          id="nickname"
          label="닉네임"
          value={userFormData.nickname}
          placeholder="닉네임을 입력해주세요"
          setValue={(value) =>
            setUserFormData((prevState) => ({ ...prevState, nickname: value }))
          }
          isValid={isValidNickname}
          setIsValid={(value) => setIsValidNickname(value)}
          validate={validateNickname}
          isAvailable={isAvailableNickname}
          checkAvailable={checkNicknameAvailable}
          message={
            !isAvailableNickname
              ? '이미 사용중인 닉네임입니다.'
              : '유효하지 않은 닉네임입니다.'
          }
        />
        <div className="w-full">
          <Button type="submit" primary fullLength>
            저장하기
          </Button>
        </div>
      </form>
    </div>
  );
}
