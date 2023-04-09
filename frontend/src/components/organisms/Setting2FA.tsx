import { CheckCircleIcon } from '@heroicons/react/20/solid';
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
      <h2 className="section-title">Two-Factor Authentication (2FA)</h2>
      <p className="mt-4 mb-8">
        2단계 보안 인증을 설정하고 계정을 더욱 강력하게 보호하세요.{' '}
        <a href="#" className="link">
          더 알아보기
        </a>
      </p>
      <div>
        {!isTwoFactor ? (
          <Button onClick={onClickSet} primary fullLength>
            설정하기
          </Button>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-full mb-2 py-1 bg-green-300 text-text-dark text-center rounded-sm text-lg font-semibold">
              <CheckCircleIcon
                className="inline-block w-4 h-4 mr-2"
                aria-hidden="true"
              />
              <span>보안 활성화됨</span>
            </div>
            <Button
              onClick={onClickUnset}
              linkStyle
              fullLength
              className="text-red"
            >
              보안 해제하기
            </Button>
          </>
        )}
      </div>
    </>
  );
}
