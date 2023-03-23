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
import { loader as channelLoader } from 'pages/ChannelPage';
import { useLogin, useUser } from 'hooks/useStore';
import SettingProfilePage from 'pages/SettingProfilePage';
import Setting2FAPage from 'pages/Setting2FAPage';
import SettingBlocksPage from 'pages/SettingBlocksPage';
import ChannelLobbyPage from 'pages/ChannelLobbyPage';
import ChannelBrowsePage from 'pages/ChannelBrowsePage';
import ChannelNewPage from 'pages/ChannelNewPage';
import ChannelPage from 'pages/ChannelPage';
import { getWhoami, getHealthCheck } from 'api/api.v1';

export const routes = (isLoggedin: boolean, hasNickname: boolean) => [
  {
    path: '/login',
    element: !hasNickname ? (
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
      !hasNickname ? (
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
        path: ':channelCode',
        element: <ChannelPage />,
        loader: channelLoader,
      },
    ],
  },
  {
    path: '/',
    element: isLoggedin ? (
      hasNickname ? (
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
  const hasNickname = useUser((state) => state.hasNickname);

  const router = createBrowserRouter(routes(isLoggedIn, hasNickname));

  return (
    <QueryClientProvider client={queryClient}>
      <Init />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function Init() {
  const login = useLogin((state) => state.login);
  const setHasNickname = useUser((state) => state.setHasNickname);

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
      setHasNickname(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    console.log('mock: ', mockApi.data);
  }, [mockApi.isSuccess]);

  return <></>;
}
