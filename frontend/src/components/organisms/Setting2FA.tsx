import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { get2faCode, delete2fa } from 'api/api.v1';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useUser } from 'hooks/useStore';
import Modal from 'components/templates/Modal';
import Verify2FA from 'components/organisms/Verify2FA';
import Button from 'components/atoms/Button';

export default function Setting2FA() {
  const { isTwoFactor, setIsTwoFactor } = useUser((state) => state);
  const [isShowVerify2fa, setIsShowVerify2fa] = useState(false);

  const get2faCodeMutation = useMutation({
    mutationFn: get2faCode,
  });

  const delete2faMutation = useMutation({
    mutationFn: delete2fa,
    onSuccess: () => {
      setIsTwoFactor(false);
    },
  });

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
            <div className="inline-flex vh-center w-full mb-2 py-1 bg-green-300 text-text-dark text-center rounded-sm text-lg font-semibold">
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
      {get2faCodeMutation.data && (
        <Modal
          title="2FA 설정"
          onClickClose={() => get2faCodeMutation.reset()}
          fitContent
        >
          <div className="w-[26rem] min-h-[28rem] vh-center flex-col mt-6">
            {!isShowVerify2fa ? (
              <>
                <div className="mb-8">
                  <img
                    src={get2faCodeMutation.data.qr}
                    alt="QR 코드"
                    className="w-52"
                  />
                </div>
                <div className="text-center mb-8">
                  <p className="mb-2">
                    QR 코드를 사용할 수 없는 경우 설정 키를 입력해 주세요.
                  </p>
                  <span className="inline-block text-lg font-medium font-mono py-2 px-4 border rounded border-gray-light select-all">
                    {get2faCodeMutation.data.key}
                  </span>
                </div>
                <Button
                  onClick={() => setIsShowVerify2fa(true)}
                  primary
                  fullLength
                >
                  다음
                </Button>
              </>
            ) : (
              <Verify2FA
                onSuccess={() => {
                  get2faCodeMutation.reset();
                  setIsShowVerify2fa(false);
                }}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
