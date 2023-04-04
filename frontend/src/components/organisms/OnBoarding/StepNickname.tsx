import { useState } from 'react';
import { FormData } from 'components/organisms/OnBoarding';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import { validateNickname } from 'utils/validatorUtils';

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function StepNickname({ formData, setFormData }: Props) {
  const [isValid, setIsValid] = useState<boolean>(false);
  return (
    <div>
      <h2>닉네임을 입력해 주세요.</h2>
      <p>2자 이상 16자 이하의 한글, 영문, 숫자 조합</p>
      <div>
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
          message="유효하지 않은 닉네임입니다."
        />
      </div>
    </div>
  );
}
