import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import LoginPage from 'pages/LoginPage';
import OnBoardingPage from 'pages/OnBoardingPage';
import Root from 'pages/Root';
import MainPage from 'pages/MainPage';
import ErrorPage from 'pages/ErrorPage';
import GamePage from 'pages/GamePage';
import FollowingPage from 'pages/FollowingPage';
import ProfilePage from 'pages/ProfilePage';
import SettingPage from 'pages/SettingPage';
import SearchResultPage from 'pages/SearchResultPage';
import { useLogin, useUser } from 'hooks/useStore';
import SettingProfilePage from 'pages/SettingProfilePage';
import Setting2FAPage from 'pages/Setting2FAPage';
import SettingBlocksPage from 'pages/SettingBlocksPage';
import ChannelLobbyPage from 'pages/ChannelLobbyPage';
import ChannelBrowsePage from 'pages/ChannelBrowsePage';
import ChannelNewPage from 'pages/ChannelNewPage';
import ChannelPage from 'pages/ChannelPage';
import { socket, SocketContext } from 'contexts/socket';
import { getHealthCheck, getWhoami } from 'api/api.v1';

export const routes = (isLoggedin: boolean, isOnboarded: boolean) => [
  {
    path: '/login',
    element: !isOnboarded ? (
      !isLoggedin ? (
        <LoginPage />
      ) : (
        <Navigate to="/on-boarding" />
      )
    ) : (
      <Navigate to="/" />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/on-boarding',
    element: isLoggedin ? (
      !isOnboarded ? (
        <OnBoardingPage />
      ) : (
        <Navigate to="/" />
      )
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: '/setting/*',
    children: [
      {
        path: 'profile',
        element: <SettingProfilePage />,
      },
      {
        path: '2fa',
        element: <Setting2FAPage />,
      },
      {
        path: 'blocks',
        element: <SettingBlocksPage />,
      },
    ],
  },
  {
    path: '/channel/*',
    children: [
      {
        path: 'browse',
        element: <ChannelBrowsePage />,
      },
      {
        path: 'new',
        element: <ChannelNewPage />,
      },
      {
        path: ':channelId',
        element: <ChannelPage />,
      },
    ],
  },
  {
    path: '/',
    element: isLoggedin ? (
      isOnboarded ? (
        <Root />
      ) : (
        <Navigate to="/on-boarding" />
      )
    ) : (
      <Navigate to="/login" />
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },

      {
        path: 'game',
        element: <GamePage />,
      },
      {
        path: 'channel',
        element: <ChannelLobbyPage />,
      },
      {
        path: 'following',
        element: <FollowingPage />,
      },
      {
        path: 'profile/:userId',
        element: <ProfilePage />,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
      {
        path: 'search',
        element: <SearchResultPage />,
      },
    ],
  },
];

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
    queryFn: getWhoami,
  });

  const mockApi = useQuery({
    queryKey: ['mock-health-check'],
    queryFn: getHealthCheck,
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
