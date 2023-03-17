import { render, screen } from '@testing-library/react';
import ChannelLobby from 'components/organisms/ChannelLobby';
import { BrowserRouter } from 'react-router-dom';

describe('Component - ChannelLobby 렌더링', () => {
  test('채널 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelLobby />
      </BrowserRouter>
    );
    screen.getByText('입장 중인 채널 목록');
  });

  test('더미 데이터 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelLobby />
      </BrowserRouter>
    );
    screen.findByText('게임 할 사람');
    screen.findByText('수다 떨어요');
  });
});
