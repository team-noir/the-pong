import AppTemplate from 'components/templates/AppTemplate';
import ChannelNew from 'components/organisms/ChannelNew';
import Header from 'components/molecule/Header';

export default function ChannelNewPage() {
  return (
    <AppTemplate header={<Header title={'새 채널 만들기'} hasBackButton />}>
      <ChannelNew />
    </AppTemplate>
  );
}
