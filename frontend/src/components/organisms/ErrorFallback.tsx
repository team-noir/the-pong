import { FallbackProps } from 'react-error-boundary';
import Button from 'components/atoms/Button';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="container mx-auto max-w-xl min-h-screen py-24 px-4">
      <div className="flex flex-col text-center mb-4">
        <h2 className="text-lg mb-4 font-bold">에러가 발생했습니다.</h2>
        <pre className="mb-4 whitespace-normal">{error.message}</pre>
        <Button primary onClick={() => resetErrorBoundary()}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}
