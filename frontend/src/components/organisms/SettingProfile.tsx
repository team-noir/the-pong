import { useState, useEffect } from 'react';
import { API_PREFIX } from 'api/api.v1';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import FileInputWithImage from 'components/molecule/FileInputWithImage';
import Button from 'components/atoms/Button';
import { ProfileFormType } from 'types';
import { validateNickname } from 'utils/validatorUtils';
import { useUser } from 'hooks/useStore';

interface Props {
  onSubmit: (userFormData: ProfileFormType) => void;
}

export default function SettingProfile({ onSubmit }: Props) {
  const [userFormData, setUserFormData] = useState<ProfileFormType>({
    nickname: '',
    imageFile: null,
  });
  const [isValidated, setIsValidated] = useState({
    nickname: false,
  });
  const { id: myUserId, nickname: myUserNickname } = useUser((state) => state);

  useEffect(() => {
    if (!myUserNickname) return;

    const nickname = myUserNickname;
    setUserFormData((prevState) => ({
      ...prevState,
      nickname,
    }));
    setIsValidated((prevState) => ({
      ...prevState,
      nickname: validateNickname(nickname),
    }));
  }, []);

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
    if (!isValidated.nickname) return;
    onSubmit(userFormData);
  };

  return (
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
        isValid={isValidated.nickname}
        setIsValid={(value) =>
          setIsValidated((prevState) => ({
            ...prevState,
            nickname: value,
          }))
        }
        validate={validateNickname}
        message="유효하지 않은 닉네임입니다."
      />
      <div className="w-full">
        <Button type="submit" primary fullLength>
          저장하기
        </Button>
      </div>
    </form>
  );
}
