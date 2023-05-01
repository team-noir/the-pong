import AppTemplate from 'components/templates/AppTemplate';
import Setting2FA from 'components/organisms/Setting2FA';
import Header from 'components/molecule/Header';

export default function Setting2FAPage() {
  return (
    <AppTemplate header={<Header title={'2FA 보안 설정'} hasBackButton />}>
      <Setting2FA />
    </AppTemplate>
  );
}
