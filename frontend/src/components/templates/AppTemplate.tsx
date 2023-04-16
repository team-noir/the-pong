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

      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray lg:my-8" />
      <footer className="container mx-auto max-w-xl p-4 bg-green-200 shadow">
        <p>Footer</p>
        <nav>
          <h5 className="font-mono text-sm font-bold">development nav</h5>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/on-boarding">On Boarding</Link>
          </li>
          <li>
            <Link to="/profile/3">user3 profile</Link>
          </li>
          <li>
            <Link to="/game/1/setting">user3 profile</Link>
          </li>
        </nav>
      </footer>
    </>
  );
}
