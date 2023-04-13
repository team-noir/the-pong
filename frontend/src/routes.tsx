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
    errorElement: <ErrorPage />,
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
    ],
  },
];
