import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
  Navigate,
} from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import OnBoardingPage from 'pages/OnBoardingPage';
import Root from 'pages/Root';
import MainPage from 'pages/MainPage';
import ErrorPage from 'pages/ErrorPage';
import GamePage from 'pages/GamePage';
import ChannelPage from 'pages/ChannelPage';
import ProfilePage from 'pages/ProfilePage';
import SettingPage from 'pages/SettingPage';
import { loader as profileLoader } from 'pages/ProfilePage';
import { useLogin } from 'hooks/useStore';

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
        path: 'profile/:userId',
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
    ],
  },
];

export function App() {
  const isLoggedIn = useLogin((state) => state.isLogin);
  const router = createBrowserRouter(routes(isLoggedIn));

  return <RouterProvider router={router} />;
}
