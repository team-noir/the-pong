import { render, screen } from '@testing-library/react';
import ChannelSetting from 'components/organisms/ChannelSetting';
import { BrowserRouter } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

describe('Component - ChannelSetting 렌더링', () => {
  const channel: ChannelType = {
    id: '0',
    title: '게임 할 사람',
    channelCode: '1234',
  };

  test('채널을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelSetting channel={channel} />
      </BrowserRouter>
    );
    screen.getByText('참가자');
  });
});
