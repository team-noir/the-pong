import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center text-lg font-medium text-white">
      <Link to="/">
        <div className="block h-8 w-auto lg:hidden">The Pong</div>
      </Link>
      <Link to="/">
        <div className="hidden h-8 w-auto lg:block">The Pong</div>
      </Link>
    </div>
  );
}
