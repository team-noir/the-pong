import AppTemplate from 'components/templates/AppTemplate';
import SettingProfile from 'components/organisms/SettingProfile';
import Header from 'components/molecule/Header';

export default function SettingProfilePage() {
  return (
    <AppTemplate header={<Header title={'프로필 수정'} hasBackButton />}>
      <SettingProfile />
    </AppTemplate>
  );
}
