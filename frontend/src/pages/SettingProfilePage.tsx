import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getWhoami, patchMyProfile, PostMyProfileImage } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import SettingProfile from 'components/organisms/SettingProfile';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { UserType } from 'types/userType';
import { ProfileFormType } from 'types/profileFormType';

export default function SettingProfilePage() {
  const navigate = useNavigate();
  const [hasImageFile, setHasImageFile] = useState<boolean>(false);

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });
  const patchMyProfileMutation = useMutation(patchMyProfile);
  const postMyProfileImageMutation = useMutation(PostMyProfileImage);

  useEffect(() => {
    if (patchMyProfileMutation.isError || postMyProfileImageMutation.isError) {
      alert('다시 시도해주세요.');
    }
    if (
      whoamiQuery.isSuccess &&
      patchMyProfileMutation.isSuccess &&
      (!hasImageFile || (hasImageFile && postMyProfileImageMutation.isSuccess))
    ) {
      navigate(`/profile/${whoamiQuery.data.id}`);
    }
  }, [patchMyProfileMutation, whoamiQuery]);

  const handleSubmit = (formData: ProfileFormType) => {
    patchMyProfileMutation.mutate(formData.nickname);
    if (formData.imageFile) {
      postMyProfileImageMutation.mutate(formData.imageFile);
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
