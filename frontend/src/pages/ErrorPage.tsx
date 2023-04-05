import { useRouteError } from 'react-router-dom';

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
      <header className="relative mx-auto max-w-xl px-2">
        <div className="flex h-14 items-center text-lg font-medium text-white items-center justify-center">
          <a href="/">The Pong</a>
        </div>
      </header>
      <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
        <h1>에러가 발생했습니다.</h1>
        <pre style={{ whiteSpace: 'normal' }}>
          {error.status} {error.statusText || error.message}
        </pre>
      </div>
    </>
  );
}
