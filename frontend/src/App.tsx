import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { healthCheck, whoami } from 'api/api.v1';
import { useLogin, useUser } from 'hooks/useStore';
import { socket, SocketContext } from 'contexts/socket';
import { routes } from 'routes';

const queryClient = new QueryClient();

export function App() {
  const isLoggedIn = useLogin((state) => state.isLogin);
  const isOnboarded = useUser((state) => state.isOnboarded);

  const router = createBrowserRouter(routes(isLoggedIn, isOnboarded));

  return (
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <Init />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SocketContext.Provider>
  );
}

function Init() {
  const login = useLogin((state) => state.login);
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

    login();
    if (whoamiQuery.data.nickname) {
      setIsOnboarded(true);
    }
  }, [whoamiQuery]);

  return <></>;
}
