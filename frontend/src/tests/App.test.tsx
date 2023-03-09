import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { App, routerConfig } from 'App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

test('메뉴에 있는 페이지들 렌더링', async () => {
  render(<App />);
  const user = userEvent.setup();

  expect(screen.getByText('MainPage')).toBeInTheDocument();

  await waitFor(() => user.click(screen.getByText(/login/i)));
  expect(screen.getByText(/LoginPage/i)).toBeInTheDocument();
  await waitFor(async () => user.click(screen.getByText(/On Boarding/i)));
  expect(screen.getByText(/OnBoardingPage/i)).toBeInTheDocument();
  await waitFor(async () => user.click(screen.getByText(/game/i)));
  expect(screen.getByText(/GamePage/i)).toBeInTheDocument();
  await waitFor(async () => user.click(screen.getByText(/channel/i)));
  expect(screen.getByText(/ChannelPage/i)).toBeInTheDocument();
  await waitFor(async () => user.click(screen.getByText(/profile/i)));
  expect(screen.getByText(/ProfilePage/i)).toBeInTheDocument();
  await waitFor(async () => user.click(screen.getByText(/setting/i)));
  expect(screen.getByText(/SettingPage/i)).toBeInTheDocument();
});

test('존재하지 않는 루트에 대한 에러 페이지 렌더링', () => {
  const badRoute = '/some/bad/route';

  const router = createMemoryRouter(routerConfig, {
    initialEntries: [badRoute],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText(/ErrorPage/i)).toBeInTheDocument();
});
