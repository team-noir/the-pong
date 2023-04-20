import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkProfile } from 'api/api.v1';
import { FormData } from 'components/organisms/OnBoarding';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import { validateNickname } from 'utils/validatorUtils';

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function StepNickname({ formData, setFormData }: Props) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isAvailable, setisAvailable] = useState(false);

  const checkProfileMutation = useMutation({
    mutationFn: checkProfile,
    onSuccess: (data) => {
      setisAvailable(data.nickname);
    },
  });

  return (
    <div>
      <h2 className="section-title">닉네임을 입력해 주세요.</h2>
      <p>2자 이상 16자 이하의 한글, 영문, 숫자 조합</p>
      <div className="my-16">
        <TextInputWithMessage
          id="step-nickname"
          value={formData.nickname}
          setValue={(value) =>
            setFormData((prevState) => ({
              ...prevState,
              nickname: value,
            }))
          }
          isValid={isValid}
          setIsValid={setIsValid}
          validate={validateNickname}
          placeholder="닉네임"
          isAvailable={isAvailable}
          checkAvailable={(value) =>
            checkProfileMutation.mutate({ nickname: value })
          }
          message={
            !isAvailable
              ? '이미 사용중인 닉네임입니다.'
              : '유효하지 않은 닉네임입니다.'
          }
        />
      </div>
    </div>
  );
}
