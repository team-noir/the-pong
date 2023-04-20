import AppTemplate from 'components/templates/AppTemplate';
import Setting2FA from 'components/organisms/Setting2FA';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';

export default function Setting2FAPage() {
  return (
    <AppTemplate header={<HeaderWithBackButton title={'2FA 보안 설정'} />}>
      <Setting2FA />
    </AppTemplate>
  );
}
