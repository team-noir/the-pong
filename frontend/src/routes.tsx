import { Navigate, Outlet } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import OnBoardingPage from 'pages/OnBoardingPage';
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
  isTwoFactor: boolean,
  isVerifiedTwoFactor: boolean
) => {
  let mainComponent = <Navigate to="/login" />;
  if (isLoggedin) {
    mainComponent = isOnboarded ? <Outlet /> : <Navigate to="/on-boarding" />;
    if (isTwoFactor && !isVerifiedTwoFactor) {
      mainComponent = <Navigate to="/2fa" />;
    }
  }

  return [
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
        isTwoFactor && !isVerifiedTwoFactor ? (
          <Verify2FAPage />
        ) : (
          <Navigate to="/" />
        ),
    },
    {
      path: '/',
      element: mainComponent,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: 'game',
          children: [
            {
              index: true,
              element: <GameLobbyPage />,
            },
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
          path: 'channel',
          children: [
            {
              index: true,
              element: <ChannelLobbyPage />,
            },
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
          path: 'following',
          element: <FollowingPage />,
        },
        {
          path: 'profile/:userId',
          element: <ProfilePage />,
        },
        {
          path: 'setting',
          children: [
            {
              index: true,
              element: <SettingPage />,
            },
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
          path: 'search',
          element: <SearchResultPage />,
        },
      ],
    },
  ];
};
