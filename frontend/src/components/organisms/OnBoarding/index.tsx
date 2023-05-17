import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import {
  checkProfile,
  updateMyProfile,
  updateMyProfileImage,
} from 'api/rest.v1';
import { useUser } from 'hooks/useStore';
import useDebounce from 'hooks/useDebounce';
import MultiSteps from 'components/organisms/OnBoarding/MultiSteps';
import StepAgreements from 'components/organisms/OnBoarding/StepAgreements';
import StepNickname from 'components/organisms/OnBoarding/StepNickname';
import StepProfileImage from 'components/organisms/OnBoarding/StepProfileImage';
import { validateAgreements, validateNickname } from 'utils/validatorUtils';
import { ProfileFormType } from 'types';
import { UI_TEXT } from 'constants/index';
import ROUTES from 'constants/routes';

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
  const updateMyProfileImageMutation = useMutation(updateMyProfileImage, {
    onError: (error: AxiosError) => {
      if (error.response?.status === StatusCodes.REQUEST_TOO_LONG) {
        alert('1MB 이하의 이미지를 선택해 주세요.');
        return;
      }
      alert(UI_TEXT.ERROR.DEFAULT);
    },
  });
  const checkProfileMutation = useMutation({
    mutationFn: checkProfile,
    onSuccess: (data) => {
      setIsAvailableNickname(data.nickname);
    },
  });
  const debouncedCheckProfile = useDebounce((nickname: string) => {
    checkProfileMutation.mutate({ nickname });
  }, 300);

  useEffect(() => {
    if (!formData.nickname) return;
    debouncedCheckProfile(formData.nickname);
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
    navigate(ROUTES.WELCOME);
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
