import { useRouteError, useNavigate } from 'react-router-dom';
import Button from 'components/atoms/Button';

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
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="relative mx-auto max-w-xl px-2">
        <div className="vh-center h-14 text-lg font-medium text-white">
          <a href="/">The Pong</a>
        </div>
      </header>
      <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
        <div className="vh-center flex-col text-center mb-4">
          <h2>에러가 발생했습니다.</h2>
          <Button primary fullLength onClick={handleClick}>
            메인으로 가기
          </Button>
        </div>
        <pre style={{ whiteSpace: 'normal' }}>
          {error.status} {error.statusText || error.message}
        </pre>
      </div>
    </>
  );
}
