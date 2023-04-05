import { FallbackProps } from 'react-error-boundary';
import Button from 'components/atoms/Button';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <>
      <header className="relative mx-auto max-w-xl px-2">
        <div className="flex h-14 items-center text-lg font-medium text-white items-center justify-center">
          <a href="/">The Pong</a>
        </div>
      </header>
      <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
        에러가 발생했습니다.
        <Button type="button" onClick={() => resetErrorBoundary()}>
          다시 시도
        </Button>
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    </>
  );
}