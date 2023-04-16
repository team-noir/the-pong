import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { get2faCode, delete2fa } from 'api/api.v1';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useUser } from 'hooks/useStore';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';

export default function Setting2FA() {
  const { isTwoFactor, setIsTwoFactor, setIsLoggedIn } = useUser(
    (state) => state
  );
  const [twoFactorCode, setTwoFactorCode] = useState<{
    qr: string;
    key: string;
  } | null>(null);

  const get2faCodeMutation = useMutation({
    mutationFn: get2faCode,
    onSuccess: (data) => {
      setTwoFactorCode(data);
    },
  });

  const delete2faMutation = useMutation({
    mutationFn: delete2fa,
    onSuccess: () => {
      setIsTwoFactor(false);
    },
  });

  const handleClickNext = () => {
    setIsLoggedIn(false);
    setIsTwoFactor(true);
  };

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
          <Button
            onClick={() => get2faCodeMutation.mutate()}
            primary
            fullLength
          >
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
              onClick={() => delete2faMutation.mutate()}
              linkStyle
              fullLength
              className="text-red"
            >
              보안 해제하기
            </Button>
          </>
        )}
      </div>
      {twoFactorCode && (
        <Modal title="2FA 설정" onClickClose={() => setTwoFactorCode(null)}>
          <div className="flex flex-col items-center">
            <div>
              <img src={twoFactorCode.qr} alt="QR 코드" className="w-20" />
            </div>
            <div>
              <h2>설정 키</h2>
              <p>QR 코드를 사용할 수 없는 경우 설정 키를 입력해 주세요.</p>
              <span>{twoFactorCode.key}</span>
            </div>
            <div>
              <Button onClick={handleClickNext} primary>
                다음
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
