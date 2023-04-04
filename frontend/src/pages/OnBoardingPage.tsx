import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateMyProfile, updateMyProfileImage } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import AppTemplateWithoutHeader from 'components/templates/AppTemplateWithoutHeader';
import OnBoarding from 'components/organisms/OnBoarding';
import { ProfileFormType } from 'types';

export default function OnBoardingPage() {
  const { setNickname, setIsOnboarded } = useUser((state) => state);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasImageFile, setHasImageFile] = useState<boolean>(false);

  const updateMyProfileMutation = useMutation(updateMyProfile);
  const updateMyProfileImageMutation = useMutation(updateMyProfileImage);

  useEffect(() => {
    if (
      updateMyProfileMutation.isError ||
      updateMyProfileImageMutation.isError
    ) {
      alert('다시 시도해주세요.');
    }
    if (
      updateMyProfileMutation.isSuccess &&
      (!hasImageFile ||
        (hasImageFile && updateMyProfileImageMutation.isSuccess))
    ) {
      setIsSubmitted(true);
      setIsOnboarded(true);
    }
  }, [updateMyProfileMutation, updateMyProfileImageMutation]);

  const handleSubmit = (formData: ProfileFormType) => {
    updateMyProfileMutation.mutate(formData.nickname);
    if (formData.imageFile) {
      updateMyProfileImageMutation.mutate(formData.imageFile, {
        onError: () => alert('다시 시도해주세요.'),
        onSuccess: () => setNickname(formData.nickname),
      });
      setHasImageFile(true);
    }
  };

  return (
    <AppTemplateWithoutHeader>
      <OnBoarding isSubmitted={isSubmitted} onSubmit={handleSubmit} />
    </AppTemplateWithoutHeader>
  );
}
