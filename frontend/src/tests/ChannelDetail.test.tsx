import { render, screen } from '@testing-library/react';
import ChannelDetail from 'components/organisms/ChannelDetail';
import { BrowserRouter } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

describe('Component - ChannelDetail 렌더링', () => {
  const channel: ChannelType = {
    id: 0,
    title: '게임 할 사람',
  };

  test('채널을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelDetail channel={channel} />
      </BrowserRouter>
    );
    screen.getByText('참가자');
  });
});
