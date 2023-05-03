import React, { ReactNode, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import LoadingFallback from 'components/organisms/LoadingFallback';
import ErrorFallback from 'components/organisms/ErrorFallback';

interface Props {
  header: ReactNode;
  children: React.ReactNode;
}

export default function AppTemplate({ header, children }: Props) {
  return (
    <>
      <header className="relative">{header}</header>

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
              <main className="container mx-auto max-w-xl px-4 pt-24">
                {children}
              </main>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}
