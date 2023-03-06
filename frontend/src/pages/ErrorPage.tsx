import { useRouteError } from 'react-router-dom';

interface RouteError {
  status: number;
  statusText: string;
  message: string;
  internal: boolean;
  data: string;
  error: any;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>ErrorPage</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.status}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
