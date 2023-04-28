import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  checkProfile,
  updateMyProfile,
  updateMyProfileImage,
} from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import MultiSteps from 'components/organisms/OnBoarding/MultiSteps';
import StepAgreements from 'components/organisms/OnBoarding/StepAgreements';
import StepNickname from 'components/organisms/OnBoarding/StepNickname';
import StepProfileImage from 'components/organisms/OnBoarding/StepProfileImage';
import { validateAgreements, validateNickname } from 'utils/validatorUtils';
import { ProfileFormType } from 'types';

export interface FormData extends ProfileFormType {
  isCheckedAll: boolean;
  isCheckedAge: boolean;
  isCheckedTerms: boolean;
  isCheckedPrivacy: boolean;
  isCheckedMarketing: boolean;
}

export default function OnBoarding() {
  const { setIsOnboarded } = useUser((state) => state);
  const [formData, setFormData] = useState<FormData>({
    isCheckedAll: false,
    isCheckedAge: false,
    isCheckedTerms: false,
    isCheckedPrivacy: false,
    isCheckedMarketing: false,
    nickname: '',
    imageFile: null,
  });
  const [isAvailableNickname, setIsAvailableNickname] = useState(false);
  const navigate = useNavigate();

  const updateMyProfileMutation = useMutation(updateMyProfile);
  const updateMyProfileImageMutation = useMutation(updateMyProfileImage);
  const checkProfileMutation = useMutation({
    mutationFn: checkProfile,
    onSuccess: (data) => {
      setIsAvailableNickname(data.nickname);
    },
  });

  useEffect(() => {
    if (!formData.nickname) return;
    checkProfileMutation.mutate({ nickname: formData.nickname });
  }, [formData.nickname]);

  const handleSubmit = (formData: ProfileFormType) => {
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
    setIsOnboarded(true);
    navigate('/welcome');
  };

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
          () => validateNickname(formData.nickname) && isAvailableNickname,
          null,
        ]}
        messages={['필수 약관에 동의해 주세요.', '닉네임을 확인해 주세요.', '']}
        onSubmit={handleSubmit}
      />
    </>
  );
}
