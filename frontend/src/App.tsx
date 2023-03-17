import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
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
import { loader as profileLoader } from 'pages/ProfilePage';
import { loader as channelLoader } from 'pages/ChannelPage';
import { useLogin } from 'hooks/useStore';
import SettingProfilePage from 'pages/SettingProfilePage';
import Setting2FAPage from 'pages/Setting2FAPage';
import SettingBlocksPage from 'pages/SettingBlocksPage';
import ChannelLobbyPage from 'pages/ChannelLobbyPage';
import ChannelBrowsePage from 'pages/ChannelBrowsePage';
import ChannelNewPage from 'pages/ChannelNewPage';
import ChannelPage from 'pages/ChannelPage';

export const routes = (isLoggedin: boolean) => [
  {
    path: '/login',
    element: !isLoggedin ? <LoginPage /> : <Navigate to="/" />,
    errorElement: <ErrorPage />,
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
    element: isLoggedin ? <Root /> : <Navigate to="/login" />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'on-boarding',
        element: <OnBoardingPage />,
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
        loader: profileLoader,
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

export function App() {
  const isLoggedIn = useLogin((state) => state.isLogin);
  const router = createBrowserRouter(routes(isLoggedIn));

  return <RouterProvider router={router} />;
}
