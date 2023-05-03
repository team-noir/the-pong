import { FallbackProps } from 'react-error-boundary';
import { SERVICE_NAME } from 'constants/index';
import ErrorFallback from 'components/organisms/ErrorFallback';
import ROUTES from 'constants/routes';

export default function ErrorFallbackWithHeader({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <>
      <header className="relative">
        <div className="header">
          <div className="h-14 vh-center px-2">
            <h1 className="text-xl font-normal text-stone-100">
              <a href={ROUTES.MAIN}>{SERVICE_NAME}</a>
            </h1>
          </div>
        </div>
      </header>
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    </>
  );
}
