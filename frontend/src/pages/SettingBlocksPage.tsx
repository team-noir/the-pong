import AppTemplate from 'components/templates/AppTemplate';
import SettingBlocks from 'components/organisms/SettingBlocks';
import Header from 'components/molecule/Header';

export default function SettingBlocksPage() {
  return (
    <AppTemplate header={<Header title={'차단 관리'} hasBackButton />}>
      <SettingBlocks />
    </AppTemplate>
  );
}
