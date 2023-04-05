import AppTemplate from 'components/templates/AppTemplate';
import ChannelNew from 'components/organisms/ChannelNew';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';

export default function ChannelNewPage() {
  return (
    <AppTemplate header={<HeaderWithBackButton title={'새 채널 만들기'} />}>
      <ChannelNew />
    </AppTemplate>
  );
}
