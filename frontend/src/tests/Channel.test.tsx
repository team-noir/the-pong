import { render, screen } from '@testing-library/react';
import Channel from 'components/organisms/Channel';
import { ChannelType } from 'types';

describe('Component - Channel 렌더링', () => {
  const channel: ChannelType = {
    id: 1,
    title: 'public test',
    isProtected: false,
    isPrivate: false,
    isDm: false,
  };

  test('채널을 보여준다', () => {
    render(
      <Channel
        messages={[]}
        postMessage={(message: string) => {}}
        myUserId={1}
      />
    );
    screen.getByPlaceholderText('메시지를 입력해 주세요');
  });
});
