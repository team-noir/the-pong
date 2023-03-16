import { render, screen } from '@testing-library/react';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import { BrowserRouter } from 'react-router-dom';

describe('Component - ChannelBrowse 렌더링', () => {
  test('채널 둘러보기 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelBrowse />
      </BrowserRouter>
    );
    screen.findByText('채널 둘러보기');
  });

  test('더미 데이터 목록을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelBrowse />
      </BrowserRouter>
    );
    screen.findByText('게임 할 사람');
    screen.findByText('수다 떨어요');
  });
});
