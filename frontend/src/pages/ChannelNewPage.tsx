import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import ChannelNew from 'components/organisms/ChannelNew';
import AppTemplate from 'components/templates/AppTemplate';

export default function ChannelNewPage() {
  return (
    <AppTemplate header={<HeaderWithBackButton title={'새 채널 만들기'} />}>
      <ChannelNew />
    </AppTemplate>
  );
}
