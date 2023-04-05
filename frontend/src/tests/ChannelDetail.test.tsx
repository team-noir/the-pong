import { render, screen } from '@testing-library/react';
import ChannelDetail from 'components/organisms/ChannelDetail';
import { BrowserRouter } from 'react-router-dom';
import { ChannelType } from 'types';

describe('Component - ChannelDetail 렌더링', () => {
  const channel: ChannelType = {
    id: 1,
    title: 'public test',
    isProtected: false,
    isPrivate: false,
    isDm: false,
  };

  test('채널을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelDetail
          channel={channel}
          myUserId={1}
          onClickSetting={() => console.log('click setting')}
          onClickInvite={() => console.log('click invite')}
          onClickLeave={() => console.log('click leave')}
        />
      </BrowserRouter>
    );
    screen.getByText('참가자');
  });
});
