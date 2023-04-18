import { useState } from 'react';
import MultiSteps from 'components/organisms/OnBoarding/MultiSteps';
import StepAgreements from 'components/organisms/OnBoarding/StepAgreements';
import StepNickname from 'components/organisms/OnBoarding/StepNickname';
import StepProfileImage from 'components/organisms/OnBoarding/StepProfileImage';
import { validateAgreements, validateNickname } from 'utils/validatorUtils';
import { ProfileFormType } from 'types';

interface Props {
  onSubmit: (formData: ProfileFormType) => void;
}

export interface FormData extends ProfileFormType {
  isCheckedAll: boolean;
  isCheckedAge: boolean;
  isCheckedTerms: boolean;
  isCheckedPrivacy: boolean;
  isCheckedMarketing: boolean;
}

export default function OnBoarding({ onSubmit }: Props) {
  const [formData, setFormData] = useState<FormData>({
    isCheckedAll: false,
    isCheckedAge: false,
    isCheckedTerms: false,
    isCheckedPrivacy: false,
    isCheckedMarketing: false,
    nickname: '',
    imageFile: null,
  });

  return (
    <>
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
        messages={['필수 약관에 동의해 주세요.', '닉네임을 확인해 주세요.', '']}
        onSubmit={onSubmit}
      />
    </>
  );
}
