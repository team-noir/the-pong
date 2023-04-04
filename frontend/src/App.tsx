import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { healthCheck, whoami } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import { socket, SocketContext } from 'contexts/socket';
import { routes } from 'routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: 'always',
      refetchInterval: 1000 * 60, // 1분
      staleTime: 1000 * 60, // 1분
    },
    mutations: {
      retry: false,
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
        <Init />
        <RouterProvider router={router} />
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
  });

  useEffect(() => {
    if (!whoamiQuery.isSuccess) return;

    login(whoamiQuery.data);

    if (whoamiQuery.data.nickname) {
      setIsOnboarded(true);
    }
  }, [whoamiQuery.isSuccess, whoamiQuery.data]);

  return <></>;
}
