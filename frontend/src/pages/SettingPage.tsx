import AppTemplate from 'components/templates/AppTemplate';
import Setting from 'components/organisms/Setting';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function SettingPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <Setting />
    </AppTemplate>
  );
}
