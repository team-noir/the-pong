import { FallbackProps } from 'react-error-boundary';
import Header from 'components/molecule/Header';
import Button from 'components/atoms/Button';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
        에러가 발생했습니다.
        <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    </>
  );
}
