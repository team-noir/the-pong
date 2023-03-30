import { Link, Outlet } from 'react-router-dom';
import PageTitle from 'components/atoms/PageTitle';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { to: '/setting/profile', text: '프로필 수정' },
  { to: '/setting/2fa', text: '2FA 설정' },
  { to: '/setting/blocks', text: '차단 관리' },
];

export default function SettingPage() {
  return (
    <div className="container max-w-xl">
      <PageTitle>Settings</PageTitle>
      <nav className="py-4 divide-y -mx-4">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="hover:bg-gray-200 px-6 py-5 text-xl flex items-center"
          >
            {item.text}
            <ChevronRightIcon className="w-5 h-5 ml-auto" aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
