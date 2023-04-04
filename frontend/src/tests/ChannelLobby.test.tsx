import { render, screen } from '@testing-library/react';
import ChannelLobby from 'components/organisms/ChannelLobby';
import { BrowserRouter } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

const dummyChannels: ChannelType[] = [
  {
    id: 1,
    title: 'public test',
    isProtected: false,
    isPrivate: false,
    isDm: false,
    isJoined: true,
  },
];

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
