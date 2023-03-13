import { useState, useEffect } from 'react';
import Button from 'components/atoms/Button';

const dummyUser = {
  id: 1,
  isTwoFactor: true,
};

export default function Setting2FA() {
  const [isTwoFactor, setIsTwoFactor] = useState<boolean>(false);

  useEffect(() => {
    // TODO: react-query 사용해서 회원 정보 로딩
    // const user = react-query....
    setIsTwoFactor(dummyUser.isTwoFactor);
  }, []);

  return (
    <>
      <h1>Setting2FA</h1>
      <h2>Two-Factor Authentication (2FA)</h2>
      <p>
        2단계 보안 인증을 설정하고 계정을 더욱 강력하게 보호하세요.{' '}
        <a href="">더 알아보기</a>
      </p>
      {!isTwoFactor && <Button type="button">설정하기</Button>}
      {isTwoFactor && (
        <div>
          <span>보안 활성화됨</span>
          <Button type="button">보안 해제하기</Button>
        </div>
      )}
    </>
  );
}
