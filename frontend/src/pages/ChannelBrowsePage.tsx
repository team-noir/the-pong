import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import AppTemplate from 'components/templates/AppTemplate';

export default function ChannelBrowsePage() {
  return (
    <AppTemplate header={<HeaderWithBackButton title={'채널 둘러보기'} />}>
      <ChannelBrowse />
    </AppTemplate>
  );
}
