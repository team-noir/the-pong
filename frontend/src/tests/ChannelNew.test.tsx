import { render, screen } from '@testing-library/react';
import ChannelNew from 'components/organisms/ChannelNew';
import { BrowserRouter } from 'react-router-dom';

describe('Component - ChannelNew 렌더링', () => {
  test('채널 생성 폼을 보여준다', () => {
    render(
      <BrowserRouter>
        <ChannelNew />
      </BrowserRouter>
    );
    screen.getByLabelText('채널 이름');
    screen.getByText('공개');
    screen.getByText('비공개');
    screen.getByLabelText('비밀번호 걸기');
  });
});
