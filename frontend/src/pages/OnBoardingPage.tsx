import OnBoarding from 'components/organisms/OnBoarding';
import { useMutation } from '@tanstack/react-query';
import { patchMyProfile, PostMyProfileImage } from 'api/api.v1';
import { useEffect, useState } from 'react';
import { ProfileFormType } from 'types/profileFormType';
import AppTemplateWithoutHeader from 'components/templates/AppTemplateWithoutHeader';
import { useUser } from 'hooks/useStore';

export default function OnBoardingPage() {
  const setIsOnboarded = useUser((state) => state.setIsOnboarded);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasImageFile, setHasImageFile] = useState<boolean>(false);

  const patchMyProfileMutation = useMutation(patchMyProfile);
  const postMyProfileImageMutation = useMutation(PostMyProfileImage);

  useEffect(() => {
    if (patchMyProfileMutation.isError || postMyProfileImageMutation.isError) {
      alert('다시 시도해주세요.');
    }
    if (
      patchMyProfileMutation.isSuccess &&
      (!hasImageFile || (hasImageFile && postMyProfileImageMutation.isSuccess))
    ) {
      setIsSubmitted(true);
      setIsOnboarded(true);
    }
  }, [patchMyProfileMutation, postMyProfileImageMutation]);

  const handleSubmit = (formData: ProfileFormType) => {
    patchMyProfileMutation.mutate(formData.nickname);
    if (formData.imageFile) {
      postMyProfileImageMutation.mutate(formData.imageFile);
      setHasImageFile(true);
    }
  };

  return (
    <AppTemplateWithoutHeader>
      <OnBoarding isSubmitted={isSubmitted} onSubmit={handleSubmit} />
    </AppTemplateWithoutHeader>
  );
}
