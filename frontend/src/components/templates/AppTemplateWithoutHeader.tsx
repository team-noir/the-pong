import React, { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorFallback from 'components/organisms/ErrorFallback';
import LoadingFallback from 'components/organisms/LoadingFalback';

interface Props {
  children: React.ReactNode;
}

export default function AppTemplateWithoutHeader({ children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
            <ErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<LoadingFallback />}>
            <main className="container mx-auto max-w-xl">{children}</main>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
