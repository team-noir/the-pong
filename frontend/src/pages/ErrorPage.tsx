import Header from 'components/molecule/Header';
import { useRouteError, Link } from 'react-router-dom';

interface RouteError {
  status: number;
  statusText: string;
  message: string;
  internal: boolean;
  data: string;
  error: Error;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
        <div className="vh-center flex-col text-center mb-4">
          <h2 className="mb-4">에러가 발생했습니다.</h2>
          <Link to="/" className="button primary w-full" replace={true}>
            메인으로 가기
          </Link>
        </div>
        <pre style={{ whiteSpace: 'normal' }}>
          {error.status} {error.statusText || error.message}
        </pre>
      </div>
    </>
  );
}
