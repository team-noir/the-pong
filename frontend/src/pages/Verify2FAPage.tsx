import { Link } from 'react-router-dom';
import AppTemplateWithoutHeader from 'components/templates/AppTemplateWithoutHeader';
import Verify2FA from 'components/organisms/Verify2FA';

export default function Verify2FAPage() {
  return (
    <AppTemplateWithoutHeader>
      <header className="relative mx-auto max-w-xl px-2">
        <div className="flex h-14 text-lg font-medium text-white vh-center">
          <Link to="/">The Pong</Link>
        </div>
      </header>
      <div className="container mx-auto max-w-xl max-h-screen py-24 px-4">
        <Verify2FA />
      </div>
    </AppTemplateWithoutHeader>
  );
}
