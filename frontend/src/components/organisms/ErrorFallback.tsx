import { FallbackProps } from 'react-error-boundary';
import Button from 'components/atoms/Button';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
      <div className="vh-center flex-col text-center mb-4">
        <h2 className="mb-4">에러가 발생했습니다.</h2>
        <Button primary fullLength onClick={() => resetErrorBoundary()}>
          다시 시도
        </Button>
      </div>
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  );
}
