import AppTemplate from 'components/templates/AppTemplate';
import Following from 'components/organisms/Following';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function FollowingPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <Following />
    </AppTemplate>
  );
}
