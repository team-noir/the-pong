import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { whoami, updateMyProfile, updateMyProfileImage } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import SettingProfile from 'components/organisms/SettingProfile';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { UserType, ProfileFormType } from 'types';

export default function SettingProfilePage() {
  const navigate = useNavigate();
  const [hasImageFile, setHasImageFile] = useState<boolean>(false);

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: whoami,
  });
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
      whoamiQuery.isSuccess &&
      updateMyProfileMutation.isSuccess &&
      (!hasImageFile ||
        (hasImageFile && updateMyProfileImageMutation.isSuccess))
    ) {
      navigate(`/profile/${whoamiQuery.data.id}`);
    }
  }, [updateMyProfileMutation, whoamiQuery]);

  const handleSubmit = (formData: ProfileFormType) => {
    updateMyProfileMutation.mutate(formData.nickname);
    if (formData.imageFile) {
      updateMyProfileImageMutation.mutate(formData.imageFile);
      setHasImageFile(true);
    }
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'프로필 수정'} />}>
      <div className="container max-w-xl px-0 sm:px-4 lg:px-6">
        {whoamiQuery.isLoading && <div>Loading...</div>}
        {whoamiQuery.isError && <div>{whoamiQuery.error.message}</div>}
        {whoamiQuery.isSuccess && (
          <SettingProfile user={whoamiQuery.data} onSubmit={handleSubmit} />
        )}
      </div>
    </AppTemplate>
  );
}
