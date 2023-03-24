import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { routes } from 'App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('Router - Nav에 있는 페이지들 렌더링', () => {
  test('Nav의 링크를 클릭하면 각 페이지로 이동한다', async () => {
    const route = '/';

    const router = createMemoryRouter(routes(true, true), {
      initialEntries: [route],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
    const user = userEvent.setup();

    screen.getByText('MainPage');

    waitFor(async () => user.click(screen.getByText(/On Boarding/i)));
    screen.findByText('서비스 이용약관에 동의해 주세요.');
    waitFor(async () => user.click(screen.getByText(/game/i)));
    screen.findByText(/GamePage/i);
    waitFor(async () => user.click(screen.getByText(/channel/i)));
    screen.findByText(/ChannelLobbyPage/i);
    waitFor(async () => user.click(screen.getByText(/following/i)));
    screen.findByText(/FollowingPage/i);
    waitFor(async () => user.click(screen.getByText(/profile/i)));
    screen.findByText(/ProfilePage/i);
    waitFor(async () => user.click(screen.getByText(/setting/i)));
    screen.findByText(/SettingPage/i);
  });
});

describe('Router - Error Page 렌더링', () => {
  test('존재하지 않는 경로로 접근할 경우 404 에러 페이지가 렌더링 된다', () => {
    const badRoute = '/some/bad/route';

    const router = createMemoryRouter(routes(true, true), {
      initialEntries: [badRoute],
    });

    render(<RouterProvider router={router} />);

    screen.getByText(/ErrorPage/i);
  });
});

describe('Router - ProfilePage 렌더링', () => {
  test('/profile/:userId로 접근하면 해당 회원의 프로필 페이지를 보여준다', async () => {
    const route = '/profile/1';

    const router = createMemoryRouter(routes(true, true), {
      initialEntries: [route],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    screen.findByText('ProfilePage');
    screen.findByTestId('1');
  });
});
