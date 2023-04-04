import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteMy2fa, getMy2fa, getWhoami } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Setting2FA from 'components/organisms/Setting2FA';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { UserType } from 'types/userType';

export default function Setting2FAPage() {
  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });
  const getMy2faMutation = useMutation(getMy2fa);
  const deleteMy2faMutation = useMutation(deleteMy2fa);

  const handleClickSet = () => {
    getMy2faMutation.mutate();
  };

  const handleClickUnset = () => {
    deleteMy2faMutation.mutate();
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'2FA 보안 설정'} />}>
      {whoamiQuery.isLoading && <div>Loading...</div>}
      {whoamiQuery.isError && <div>{whoamiQuery.error.message}</div>}
      {whoamiQuery.isSuccess && (
        <Setting2FA
          isTwoFactor={whoamiQuery.data.isTwoFactor}
          onClickSet={handleClickSet}
          onClickUnset={handleClickUnset}
        />
      )}
    </AppTemplate>
  );
}
