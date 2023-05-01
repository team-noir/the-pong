import { Navigate } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import OnBoardingPage from 'pages/OnBoardingPage';
import MainPage from 'pages/MainPage';
import ErrorPage from 'pages/ErrorPage';
import GameLobbyPage from 'pages/GameLobbyPage';
import GamePage from 'pages/GamePage';
import FollowingPage from 'pages/FollowingPage';
import ProfilePage from 'pages/ProfilePage';
import SettingPage from 'pages/SettingPage';
import SearchPage from 'pages/SearchPage';
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
import Root from 'pages/Root';
import ROUTES from 'constants/routes';

export const routes = (
  isLoggedin: boolean,
  isOnboarded: boolean,
  isTwoFactor: boolean,
  isVerifiedTwoFactor: boolean
) => {
  let mainComponent = <Navigate to={ROUTES.LOGIN} />;
  if (isLoggedin) {
    mainComponent = isOnboarded ? (
      <Root />
    ) : (
      <Navigate to={ROUTES.ONBOARDING} />
    );
    if (isTwoFactor && !isVerifiedTwoFactor) {
      mainComponent = <Navigate to={ROUTES.TWO_FACTOR_AUTH} />;
    }
  }

  return [
    {
      path: ROUTES.LOGIN,
      element: !isLoggedin ? <LoginPage /> : <Navigate to={ROUTES.MAIN} />,
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTES.ONBOARDING,
      element: !isOnboarded ? (
        <OnBoardingPage />
      ) : (
        <Navigate to={ROUTES.MAIN} />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTES.TWO_FACTOR_AUTH,
      errorElement: <ErrorPage />,
      element:
        isTwoFactor && !isVerifiedTwoFactor ? (
          <Verify2FAPage />
        ) : (
          <Navigate to={ROUTES.MAIN} />
        ),
    },
    {
      path: ROUTES.MAIN,
      element: mainComponent,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: ROUTES.GAME.INDEX,
          children: [
            {
              index: true,
              element: <GameLobbyPage />,
            },
            {
              path: ROUTES.GAME.CHILDREN.GAME,
              element: <GamePage />,
            },
            {
              path: ROUTES.GAME.CHILDREN.SETTING,
              element: <GameSettingPage />,
            },
          ],
        },
        {
          path: ROUTES.CHANNEL.INDEX,
          children: [
            {
              index: true,
              element: <ChannelLobbyPage />,
            },
            {
              path: ROUTES.CHANNEL.CHILDREN.BROWSE,
              element: <ChannelBrowsePage />,
            },
            {
              path: ROUTES.CHANNEL.CHILDREN.NEW,
              element: <ChannelNewPage />,
            },
            {
              path: ROUTES.CHANNEL.CHILDREN.CHANNEL,
              element: <ChannelPage />,
            },
          ],
        },
        {
          path: ROUTES.FOLLOWING,
          element: <FollowingPage />,
        },
        {
          path: `${ROUTES.PROFILE}/${ROUTES.PROFILE.CHILDREN.USER}`,
          element: <ProfilePage />,
        },
        {
          path: ROUTES.SETTING.INDEX,
          children: [
            {
              index: true,
              element: <SettingPage />,
            },
            {
              path: ROUTES.SETTING.CHILDREN.PROFILE,
              element: <SettingProfilePage />,
            },
            {
              path: ROUTES.SETTING.CHILDREN.TWO_FACTOR_AUTH,
              element: <Setting2FAPage />,
            },
            {
              path: ROUTES.SETTING.CHILDREN.BLOCKS,
              element: <SettingBlocksPage />,
            },
          ],
        },
        {
          path: ROUTES.SEARCH,
          element: <SearchPage />,
        },
        {
          path: ROUTES.WELCOME,
          element: <WelcomePage />,
        },
      ],
    },
  ];
};
