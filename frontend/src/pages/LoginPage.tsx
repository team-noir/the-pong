import Login from 'components/organisms/Login';
import AppTemplateWithoutHeader from 'components/templates/AppTemplateWithoutHeader';

export default function LoginPage() {
  return (
    <AppTemplateWithoutHeader>
      <h1>LoginPage</h1>
      <Login />
    </AppTemplateWithoutHeader>
  );
}
