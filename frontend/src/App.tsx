import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useQuery,
} from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { healthCheck, whoami } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import { socket, SocketContext } from 'contexts/socket';
import LoadingFallback from 'components/organisms/LoadingFalback';
import ErrorFallbackWithHeader from 'components/organisms/ErrorFallbackWithHeader';
import { routes } from 'routes';
import { UI_TEXT } from 'constants/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: 'always',
      staleTime: 1000 * 60, // 1분
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: {
      retry: false,
      onError: () => alert(UI_TEXT.ERROR.DEFAULT),
    },
  },
});

export function App() {
  const { isLoggedIn, isOnboarded, isTwoFactor, isVerifiedTwoFactor } = useUser(
    (state) => state
  );

  const router = createBrowserRouter(
    routes(isLoggedIn, isOnboarded, isTwoFactor, isVerifiedTwoFactor)
  );

  return (
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({
                error,
                resetErrorBoundary,
              }: FallbackProps) => (
                <ErrorFallbackWithHeader
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense fallback={<LoadingFallback />}>
                <Init />
                <RouterProvider router={router} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SocketContext.Provider>
  );
}

function Init() {
  const login = useUser((state) => state.login);

  useQuery({
    queryKey: ['health'],
    queryFn: healthCheck,
  });

  useQuery({
    queryKey: ['whoami'],
    queryFn: whoami,
    onSuccess: (data) => login(data),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    useErrorBoundary: false,
  });

  return <></>;
}
