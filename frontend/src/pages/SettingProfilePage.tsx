import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateMyProfile, updateMyProfileImage } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import SettingProfile from 'components/organisms/SettingProfile';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { ProfileFormType } from 'types';
import { useUser } from 'hooks/useStore';

export default function SettingProfilePage() {
  const [hasImageFile, setHasImageFile] = useState<boolean>(false);
  const { id: myUserId, setNickname } = useUser((state) => state);
  const navigate = useNavigate();

  const updateMyProfileMutation = useMutation(updateMyProfile);

  const updateMyProfileImageMutation = useMutation(updateMyProfileImage);

  useEffect(() => {
    if (
      updateMyProfileMutation.isSuccess &&
      (!hasImageFile ||
        (hasImageFile && updateMyProfileImageMutation.isSuccess))
    ) {
      navigate(`/profile/${myUserId}`);
    }
  }, [updateMyProfileMutation]);

  const handleSubmit = (formData: ProfileFormType) => {
    updateMyProfileMutation.mutate(formData.nickname, {
      onSuccess: () => setNickname(formData.nickname),
    });
    if (formData.imageFile) {
      updateMyProfileImageMutation.mutate(formData.imageFile);
      setHasImageFile(true);
    }
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'프로필 수정'} />}>
      <div className="container max-w-xl px-0 sm:px-4 lg:px-6">
        <SettingProfile onSubmit={handleSubmit} />
      </div>
    </AppTemplate>
  );
}
