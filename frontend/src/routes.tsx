import { Navigate } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import OnBoardingPage from 'pages/OnBoardingPage';
import Root from 'pages/Root';
import MainPage from 'pages/MainPage';
import ErrorPage from 'pages/ErrorPage';
import GameLobbyPage from 'pages/GameLobbyPage';
import GamePage from 'pages/GamePage';
import FollowingPage from 'pages/FollowingPage';
import ProfilePage from 'pages/ProfilePage';
import SettingPage from 'pages/SettingPage';
import SearchResultPage from 'pages/SearchResultPage';
import SettingProfilePage from 'pages/SettingProfilePage';
import Setting2FAPage from 'pages/Setting2FAPage';
import SettingBlocksPage from 'pages/SettingBlocksPage';
import ChannelLobbyPage from 'pages/ChannelLobbyPage';
import ChannelBrowsePage from 'pages/ChannelBrowsePage';
import ChannelNewPage from 'pages/ChannelNewPage';
import ChannelPage from 'pages/ChannelPage';
import GameSettingPage from 'pages/GameSettingPage';
import WelcomePage from 'pages/WelcomePage';
import Verify2FAPage from 'pages/Verify2FAPage';

export const routes = (
  isLoggedin: boolean,
  isOnboarded: boolean,
  isTwoFactor: boolean
) => [
  {
    path: '/login',
    element: !isLoggedin ? <LoginPage /> : <Navigate to="/" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/on-boarding',
    element: !isOnboarded ? <OnBoardingPage /> : <Navigate to="/" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/2fa',
    errorElement: <ErrorPage />,
    element:
      !isLoggedin && isTwoFactor ? <Verify2FAPage /> : <Navigate to="/" />,
  },
  {
    path: '/setting/*',
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'profile',
        element: <SettingProfilePage />,
      },
      {
        path: '2fa',
        element:
          !isLoggedin && isTwoFactor ? (
            <Navigate to="/2fa" state={{ redirectTo: '/setting/2fa' }} />
          ) : (
            <Setting2FAPage />
          ),
      },
      {
        path: 'blocks',
        element: <SettingBlocksPage />,
      },
    ],
  },
  {
    path: '/channel/*',
    errorElement: <ErrorPage />,
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
    path: '/game/*',
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':gameId',
        element: <GamePage />,
      },
      {
        path: ':gameId/setting',
        element: <GameSettingPage />,
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
    ) : isTwoFactor ? (
      <Navigate to="/2fa" state={{ redirectTo: '/' }} />
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
        element: <GameLobbyPage />,
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
      {
        path: 'welcome',
        element: <WelcomePage />,
      },
    ],
  },
];
