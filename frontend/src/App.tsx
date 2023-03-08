import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '/on-boarding',
        element: <OnBoardingPage />,
      },
      {
        path: '/game',
        element: <GamePage />,
      },
      {
        path: '/channel',
        element: <ChannelPage />,
      },
      {
        path: '/profile/:userId',
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: '/setting',
        element: <SettingPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export function App() {
  return <RouterProvider router={router} />;
}
