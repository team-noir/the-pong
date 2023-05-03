import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import {
  API_PREFIX,
  checkProfile,
  deleteMyProfileImage,
  updateMyProfile,
  updateMyProfileImage,
} from 'api/rest.v1';
import { useUser } from 'hooks/useStore';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import FileInputWithImage from 'components/molecule/FileInputWithImage';
import Button from 'components/atoms/Button';
import { validateNickname } from 'utils/validatorUtils';
import { ProfileFormType } from 'types';
import { UI_TEXT } from 'constants/index';
import ROUTES from 'constants/routes';

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
  const [isAvailableNickname, setIsAvailableNickname] = useState(false);
  const [isClickDelete, setIsClickDelete] = useState(false);
  const navigate = useNavigate();

  const onSuccess = () => {
    setNickname(formData.nickname);
    myUserId && navigate(ROUTES.PROFILE.USER(myUserId));
  };
  const checkProfileMutation = useMutation({
    mutationFn: checkProfile,
    onSuccess: (data) => {
      setIsAvailableNickname(data.nickname);
    },
  });
  const updateMyProfileMutation = useMutation(updateMyProfile);
  const updateMyProfileImageMutation = useMutation(updateMyProfileImage, {
    onSuccess,
    onError: (error: AxiosError) => {
      if (error.response?.status === StatusCodes.REQUEST_TOO_LONG) {
        alert('1MB 이하의 이미지를 선택해 주세요.');
        return;
      }
      alert(UI_TEXT.ERROR.DEFAULT);
    },
  });
  const deleteMyProfileImageMutation = useMutation(deleteMyProfileImage, {
    onSuccess,
  });

  useEffect(() => {
    if (!myUserNickname) return;

    const nickname = myUserNickname;
    setFormData((prevState) => ({
      ...prevState,
      nickname,
    }));
    setIsValidNickname(true);
    setIsAvailableNickname(true);
  }, [myUserNickname]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setFormData((prevState) => ({
      ...prevState,
      imageFile: files[0],
    }));
    setIsClickDelete(false);
  };

  const handleClickFileRemove = () => {
    setFormData((prevState) => ({
      ...prevState,
      imageFile: null,
    }));
    setIsClickDelete(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidNickname || !isAvailableNickname) return;
    updateMyProfileMutation.mutate(formData.nickname, {
      onSuccess: () => {
        !isClickDelete && !formData.imageFile && onSuccess();
      },
    });
    if (isClickDelete) {
      deleteMyProfileImageMutation.mutate();
    }
    if (formData.imageFile) {
      updateMyProfileImageMutation.mutate(formData.imageFile);
    }
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
          imageUrl={
            isClickDelete ? '' : `${API_PREFIX}/users/${myUserId}/profile-image`
          }
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
