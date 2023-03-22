import { useState, useEffect } from 'react';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import Button from 'components/atoms/Button';
import FileInputWithImage from 'components/molecule/FileInputWithImage';
import { validateNickname } from 'utils/validatorUtils';
import { API_PREFIX } from 'api/api.v1';
import { UserType } from 'types/userType';
import { UserForm } from 'pages/SettingProfilePage';

interface Props {
  user: UserType;
  onSubmit: (userFormData: UserForm) => void;
}

export default function SettingProfile({ user, onSubmit }: Props) {
  const [userFormData, setUserFormData] = useState<UserForm>({
    nickname: '',
    imageFile: null,
  });
  const [isValidated, setIsValidated] = useState({
    nickname: false,
  });

  useEffect(() => {
    if (!user.nickname) return;

    const nickname = user.nickname;
    setUserFormData((prevState) => ({
      ...prevState,
      nickname,
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
    <form onSubmit={handleSubmit}>
      <FileInputWithImage
        imageUrl={`${API_PREFIX}/users/${user.id}/profile-image`}
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
      <div>
        <Button type="submit">저장하기</Button>
      </div>
    </form>
  );
}
