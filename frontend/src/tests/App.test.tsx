import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { routes } from 'routes';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const clickBurgerButton = async (user: any) => {
  await waitFor(async () =>
    user.click(await screen.findByText(/Open global menu/i))
  );
};

describe('Router - Nav에 있는 페이지들 렌더링', () => {
  test('Nav의 링크를 클릭하면 각 페이지로 이동한다', async () => {
    const originalError = console.error;
    console.error = jest.fn();

    const route = '/';

    const router = createMemoryRouter(routes(true, true, false, false), {
      initialEntries: [route],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    const user = userEvent.setup();

    screen.findByText('MainPage');

    clickBurgerButton(user);
    await waitFor(async () => user.click(await screen.findByText(/game/i)));
    screen.findByText(/GamePage/i);

    clickBurgerButton(user);
    await waitFor(async () => user.click(await screen.findByText(/channel/i)));
    screen.findByText('채널');

    clickBurgerButton(user);
    await waitFor(async () =>
      user.click(await screen.findByText(/following/i))
    );
    screen.findByText(/FollowingPage/i);

    clickBurgerButton(user);
    await waitFor(async () => user.click(await screen.findByText(/setting/i)));
    screen.findByText(/Settings/i);

    console.error = originalError;
  });
});

describe('Router - Error Page 렌더링', () => {
  test('존재하지 않는 경로로 접근할 경우 404 에러 페이지가 렌더링 된다', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const badRoute = '/some/bad/route';

    const router = createMemoryRouter(routes(true, true, false, false), {
      initialEntries: [badRoute],
    });

    render(<RouterProvider router={router} />);

    screen.findByText(/에러가 발생했습니다./i);

    console.error = originalError;
  });
});
