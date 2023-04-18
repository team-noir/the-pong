import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateMyProfile, updateMyProfileImage } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import AppTemplateWithoutHeader from 'components/templates/AppTemplateWithoutHeader';
import OnBoarding from 'components/organisms/OnBoarding';
import { ProfileFormType } from 'types';

export default function OnBoardingPage() {
  const { setIsOnboarded } = useUser((state) => state);
  const navigate = useNavigate();

  const updateMyProfileMutation = useMutation(updateMyProfile);
  const updateMyProfileImageMutation = useMutation(updateMyProfileImage);

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
    <AppTemplateWithoutHeader>
      <OnBoarding onSubmit={handleSubmit} />
    </AppTemplateWithoutHeader>
  );
}
