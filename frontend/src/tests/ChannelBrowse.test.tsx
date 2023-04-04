import { render, screen } from '@testing-library/react';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import { BrowserRouter } from 'react-router-dom';
import { ChannelType } from 'types';

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

describe('Component - ChannelBrowse 렌더링', () => {
  test('채널 둘러보기 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelBrowse
          channels={dummyChannels}
          onClick={() => console.log('clicked')}
        />
      </BrowserRouter>
    );
    screen.findByText('채널 둘러보기');
  });
});
