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
import ChannelPage from 'pages/ChannelPage';
import FollowingPage from 'pages/FollowingPage';
import ProfilePage from 'pages/ProfilePage';
import SettingPage from 'pages/SettingPage';
import SearchResultPage from 'pages/SearchResultPage';
import { loader as profileLoader } from 'pages/ProfilePage';
import { useLogin } from 'hooks/useStore';
import SettingProfile from 'components/organisms/SettingProfile';
import Setting2FA from 'components/organisms/Setting2FA';
import SettingBlocks from 'components/organisms/SettingBlocks';

export const routes = (isLoggedin: boolean) => [
  {
    path: '/login',
    element: !isLoggedin ? <LoginPage /> : <Navigate to="/" />,
    errorElement: <ErrorPage />,
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
        element: <ChannelPage />,
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
        children: [
          {
            path: 'profile',
            element: <SettingProfile />,
          },
          {
            path: '2fa',
            element: <Setting2FA />,
          },
          {
            path: 'blocks',
            element: <SettingBlocks />,
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

export function App() {
  const isLoggedIn = useLogin((state) => state.isLogin);
  const router = createBrowserRouter(routes(isLoggedIn));

  return <RouterProvider router={router} />;
}
