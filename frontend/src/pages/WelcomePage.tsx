import Welcome from 'components/organisms/Welcome';
import AppTemplateWithoutHeader from 'components/templates/AppTemplateWithoutHeader';

export default function WelcomePage() {
  return (
    <AppTemplateWithoutHeader>
      <Welcome />
    </AppTemplateWithoutHeader>
  );
}
