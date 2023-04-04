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

  // TODO: error handling
  const { data, isSuccess } = useQuery({
    queryKey: ['whoami'],
    queryFn: whoami,
  });

  const mockApi = useQuery({
    queryKey: ['mock-health-check'],
    queryFn: healthCheck,
  });

  useEffect(() => {
    if (!isSuccess) return;

    login();
    if (data.nickname) {
      setIsOnboarded(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    console.log('mock: ', mockApi.data);
  }, [mockApi.isSuccess]);

  return <></>;
}
