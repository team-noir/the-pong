import { render, screen } from '@testing-library/react';
import SettingProfile from 'components/organisms/SettingProfile';

describe('Component - SettingProfile 렌더링', () => {
  test('로그인한 회원의 정보를 담은 설정 페이지를 보여준다', () => {
    render(<SettingProfile />);
    screen.getByAltText('profile image');
    screen.getByText('이미지 삭제하기');
    screen.getByText('이미지 업로드하기');
    screen.getByLabelText('닉네임');
    screen.getByText('저장하기');
  });
});
