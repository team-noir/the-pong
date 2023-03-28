import { render, screen } from '@testing-library/react';
import Channel from 'components/organisms/Channel';
import { ChannelType } from 'types/channelType';

describe('Component - Channel 렌더링', () => {
  const channel: ChannelType = {
    id: 0,
    title: '게임 할 사람',
  };

  test('채널을 보여준다', () => {
    render(<Channel channel={channel} />);
    screen.getByPlaceholderText('메시지를 입력해 주세요');
  });
});
