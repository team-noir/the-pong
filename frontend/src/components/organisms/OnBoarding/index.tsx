import { useState } from 'react';
import MultiSteps from 'components/organisms/OnBoarding/MultiSteps';
import StepAgreements from 'components/organisms/OnBoarding/StepAgreements';
import StepNickname from 'components/organisms/OnBoarding/StepNickname';
import StepProfileImage from 'components/organisms/OnBoarding/StepProfileImage';
import StepWelcome from 'components/organisms/OnBoarding/StepWelcome';
import { validateAgreements, validateNickname } from 'utils/validatorUtils';

export interface FormData {
  isCheckedAll: boolean;
  isCheckedAge: boolean;
  isCheckedTerms: boolean;
  isCheckedPrivacy: boolean;
  isCheckedMarketing: boolean;
  nickname: string;
  profileImage: File | null;
}

export default function OnBoarding() {
  const [formData, setFormData] = useState<FormData>({
    isCheckedAll: false,
    isCheckedAge: false,
    isCheckedTerms: false,
    isCheckedPrivacy: false,
    isCheckedMarketing: false,
    nickname: '',
    profileImage: null,
  });

  return (
    <>
      <h1>OnBoarding</h1>
      <MultiSteps
        formData={formData}
        stepComponents={[
          <StepAgreements
            key={0}
            formData={formData}
            setFormData={setFormData}
          />,
          <StepNickname
            key={1}
            formData={formData}
            setFormData={setFormData}
          />,
          <StepProfileImage key={2} setFormData={setFormData} />,
        ]}
        resultComponent={<StepWelcome />}
        validators={[
          () =>
            validateAgreements([
              formData.isCheckedAge,
              formData.isCheckedTerms,
              formData.isCheckedPrivacy,
            ]),
          () => validateNickname(formData.nickname),
          null,
        ]}
        messages={['필수 약관에 동의해주세요.', '닉네임을 입력해주세요.', '']}
      />
    </>
  );
}
