import { render, screen } from '@testing-library/react';
import OnBoarding from 'components/organisms/OnBoarding';

describe('Component - OnBoarding 렌더링', () => {
  test('온보딩 페이지를 보여준다', () => {
    render(
      <OnBoarding
        isSubmitted={false}
        onSubmit={() => console.log('submitted')}
      />
    );
    screen.findByText('서비스 이용약관에 동의해 주세요.');
    screen.findByText('모두 동의하기');
    screen.findByText('다음');
  });
});
