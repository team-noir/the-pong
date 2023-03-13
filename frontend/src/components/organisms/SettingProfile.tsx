import { useState, useEffect } from 'react';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import Button from 'components/atoms/Button';
import FileInputWithImage from 'components/molecule/FileInputWithImage';
import { validateNickname } from 'utils/validatorUtils';

interface UserForm {
  nickname: string;
  imageFile: File | null;
}

export default function SettingProfile() {
  const dummyUser = {
    id: 1,
    profileimageUrl: 'https://placekitten.com/800/800',
  };
  const [userFormData, setUserFormData] = useState<UserForm>({
    nickname: '',
    imageFile: null,
  });
  const [isValidated, setIsValidated] = useState({
    nickname: false,
  });

  useEffect(() => {
    // TODO: react-query 사용해서 회원 정보 로딩
    // const user = react-query....
    setUserFormData({
      ...userFormData,
      nickname: '닉네임',
    });
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

  return (
    <>
      <h1>Setting profile</h1>
      <form>
        <FileInputWithImage
          imageUrl={dummyUser.profileimageUrl}
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
    </>
  );
}
