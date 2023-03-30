import { render, screen } from '@testing-library/react';
import ChannelLobby from 'components/organisms/ChannelLobby';
import { dummyChannels } from 'pages/ChannelLobbyPage';
import { BrowserRouter } from 'react-router-dom';

describe('Component - ChannelLobby 렌더링', () => {
  test('채널 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelLobby
          channels={dummyChannels}
          onClick={() => console.log('clicked')}
        />
      </BrowserRouter>
    );
    screen.getByText('입장 중인 채널 목록');
  });
});
