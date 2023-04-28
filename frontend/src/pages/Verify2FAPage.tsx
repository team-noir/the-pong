import AppTemplate from 'components/templates/AppTemplate';
import Verify2FA from 'components/organisms/Verify2FA';
import Header from 'components/molecule/Header';

export default function Verify2FAPage() {
  return (
    <AppTemplate header={<Header />}>
      <Verify2FA />
    </AppTemplate>
  );
}
