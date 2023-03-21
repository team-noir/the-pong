import AppTemplate from 'components/templates/AppTemplate';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { getWhoami, patchMyProfile } from 'api/api.v1';
import { useQuery, useMutation } from '@tanstack/react-query';
import { UserType } from 'types/userType';
import { AxiosError } from 'axios';
import SettingProfile from 'components/organisms/SettingProfile';

export interface UserForm {
  nickname: string;
  imageFile: File | null;
}

export default function SettingProfilePage() {
  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });

  const patchMyProfileMutation = useMutation(patchMyProfile);

  const handleSubmit = (userFormData: UserForm) => {
    const answer = confirm('저장하시겠습니까?');
    if (!answer) return;

    patchMyProfileMutation.mutate(userFormData.nickname);
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'프로필 수정'} />}>
      {whoamiQuery.isLoading && <div>Loading...</div>}
      {whoamiQuery.isError && <div>{whoamiQuery.error.message}</div>}
      {whoamiQuery.isSuccess && (
        <SettingProfile user={whoamiQuery.data} onSubmit={handleSubmit} />
      )}
    </AppTemplate>
  );
}
