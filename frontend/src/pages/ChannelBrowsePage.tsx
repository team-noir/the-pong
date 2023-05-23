import AppTemplate from 'components/templates/AppTemplate';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import Header from 'components/molecule/Header';

export default function ChannelBrowsePage() {
  return (
    <AppTemplate header={<Header title={'채널 둘러보기'} hasBackButton />}>
      <ChannelBrowse />
    </AppTemplate>
  );
}
