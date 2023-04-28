import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import LoadingFallback from 'components/organisms/LoadingFalback';
import ErrorFallback from 'components/organisms/ErrorFallback';

interface Props {
  header: React.ReactElement;
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
              <main className="container mx-auto max-w-xl min-h-screen py-24 px-4">
                {children}
              </main>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}
