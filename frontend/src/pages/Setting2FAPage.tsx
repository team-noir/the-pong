import { useMutation } from '@tanstack/react-query';
import { deleteMy2fa, getMy2fa } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Setting2FA from 'components/organisms/Setting2FA';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';

export default function Setting2FAPage() {
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
      <Setting2FA onClickSet={handleClickSet} onClickUnset={handleClickUnset} />
    </AppTemplate>
  );
}
