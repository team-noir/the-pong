import Button from 'components/atoms/Button';
import { useUser } from 'hooks/useStore';

interface Props {
  onClickSet: () => void;
  onClickUnset: () => void;
}

export default function Setting2FA({ onClickSet, onClickUnset }: Props) {
  const isTwoFactor = useUser((state) => state.isTwoFactor);

  return (
    <>
      <h2>Two-Factor Authentication (2FA)</h2>
      <p>
        2단계 보안 인증을 설정하고 계정을 더욱 강력하게 보호하세요.
        <a href="">더 알아보기</a>
      </p>
      <div>
        {!isTwoFactor ? (
          <Button onClick={onClickSet}>설정하기</Button>
        ) : (
          <>
            <span>보안 활성화됨</span>
            <Button onClick={onClickUnset}>보안 해제하기</Button>
          </>
        )}
      </div>
    </>
  );
}
