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
import ErrorFallback from 'components/organisms/ErrorFallback';
import { routes } from 'routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: 'always',
      refetchInterval: 1000 * 60, // 1분
      staleTime: 1000 * 60, // 1분
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: {
      retry: false,
      onError: () => alert('다시 시도해 주세요.'),
    },
  },
});

export function App() {
  const isLoggedIn = useUser((state) => state.isLogin);
  const isOnboarded = useUser((state) => state.isOnboarded);

  const router = createBrowserRouter(routes(isLoggedIn, isOnboarded));

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
                <ErrorFallback
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
  const setIsOnboarded = useUser((state) => state.setIsOnboarded);

  const healthCheckQuery = useQuery({
    queryKey: ['health-check'],
    queryFn: healthCheck,
  });

  const whoamiQuery = useQuery({
    queryKey: ['whoami'],
    queryFn: whoami,
    onSuccess: (data) => {
      login(data);

      if (data.nickname) {
        setIsOnboarded(true);
      }
    },
    onError: (error: Error) => console.log(error.message),
    suspense: false,
    useErrorBoundary: false,
  });

  return <></>;
}
