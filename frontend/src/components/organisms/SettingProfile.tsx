import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  API_PREFIX,
  checkProfile,
  updateMyProfile,
  updateMyProfileImage,
} from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import FileInputWithImage from 'components/molecule/FileInputWithImage';
import Button from 'components/atoms/Button';
import { validateNickname } from 'utils/validatorUtils';
import { ProfileFormType } from 'types';

export default function SettingProfile() {
  const {
    id: myUserId,
    nickname: myUserNickname,
    setNickname,
  } = useUser((state) => state);
  const [formData, setFormData] = useState<ProfileFormType>({
    nickname: '',
    imageFile: null,
  });
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);
  const navigate = useNavigate();

  const checkProfileMutation = useMutation({
    mutationFn: checkProfile,
    onSuccess: (data) => {
      setIsAvailableNickname(data.nickname);
    },
  });
  const updateMyProfileMutation = useMutation(updateMyProfile);
  const updateMyProfileImageMutation = useMutation(updateMyProfileImage);

  useEffect(() => {
    if (!myUserNickname) return;

    const nickname = myUserNickname;
    setFormData((prevState) => ({
      ...prevState,
      nickname,
    }));
    setIsValidNickname(validateNickname(nickname));
  }, [myUserNickname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setFormData((prevState) => ({
      ...prevState,
      imageFile: files[0],
    }));
  };

  const handleClickFileRemove = () => {
    setFormData((prevState) => ({
      ...prevState,
      imageFile: null,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidNickname || !isAvailableNickname) return;
    updateMyProfileMutation.mutate(formData.nickname, {
      onSuccess: () => {
        !formData.imageFile && handleSuccess();
      },
    });
    if (formData.imageFile) {
      updateMyProfileImageMutation.mutate(formData.imageFile, {
        onSuccess: handleSuccess,
      });
    }
  };

  const handleSuccess = () => {
    setNickname(formData.nickname);
    navigate(`/profile/${myUserId}`);
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
          value={formData.nickname}
          placeholder="닉네임을 입력해주세요"
          setValue={(value) =>
            setFormData((prevState) => ({ ...prevState, nickname: value }))
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
