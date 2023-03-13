import { Link, Outlet } from 'react-router-dom';

export default function SettingPage() {
  return (
    <>
      <h1>SettingPage</h1>
      <nav>
        <li>
          <Link to="/setting/profile">프로필 수정</Link>
        </li>
        <li>
          <Link to="/setting/2fa">2FA 설정</Link>
        </li>
        <li>
          <Link to="/setting/blocks">차단 관리</Link>
        </li>
      </nav>
      <Outlet />
    </>
  );
}
