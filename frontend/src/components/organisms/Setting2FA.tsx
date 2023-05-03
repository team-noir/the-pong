import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { get2faCode, delete2fa } from 'api/rest.v1';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useUser } from 'hooks/useStore';
import Modal from 'components/templates/Modal';
import Verify2FA from 'components/organisms/Verify2FA';
import Button from 'components/atoms/Button';

export default function Setting2FA() {
  const { isTwoFactor, setIsTwoFactor } = useUser((state) => state);
  const [isShowVerify2fa, setIsShowVerify2fa] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);

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
        2단계 보안 인증을 설정하고 계정을 더욱 강력하게 보호하세요.
        <span
          onClick={() => setIsShowInfo(true)}
          className="underline cursor-pointer ml-1"
        >
          더 알아보기
        </span>
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
      {isShowInfo && (
        <Modal title="2FA 설정 안내" onClickClose={() => setIsShowInfo(false)}>
          <div className="leading-7">
            <h2 className="text-2xl">2FA란?</h2>
            <hr className="my-2" />
            <p>
              2FA는 Two-Factor Authentication의 약자로, 2단계 보안 인증을
              의미합니다. <br />
              2FA를 설정하면 로그인 시 인증 코드를 입력해야 하므로 계정을 더욱
              안전하게 보호할 수 있습니다.
            </p>
            <h2 className="text-2xl mt-6 mb-2">2FA 사용 방법</h2>
            <hr className="my-2" />
            <ol>
              <li>
                <h3 className="text-lg font-bold my-1">
                  1단계: 모바일 인증 앱 설치
                </h3>
                <p>
                  Google Authenticator:
                  <a
                    href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                    target="_blank"
                    rel="noreferrer"
                    className="text-green hover:underline mx-2"
                  >
                    [Android]
                  </a>
                  <a
                    href="https://apps.apple.com/kr/app/google-authenticator/id388497605"
                    target="_blank"
                    rel="noreferrer"
                    className="text-green hover:underline"
                  >
                    [iOS]
                  </a>
                </p>
              </li>
              <li className="mt-2">
                <h3 className="text-lg font-bold my-1">
                  2단계: The Pong에서 2FA 설정
                </h3>
                <ol>
                  <li>
                    1. 2FA 보안 설정 페이지의 <em>설정하기</em> 버튼 클릭
                  </li>
                  <li>2. 인증 앱에서 QR 코드 스캔 혹은 설정 키 입력</li>
                  <li>3. 인증 앱이 생성하는 6자리 인증 코드 입력</li>
                </ol>
                <p className="mt-2">
                  이후 로그인할 때는 인증 앱이 생성하는 코드만 입력하면 됩니다.
                </p>
              </li>
            </ol>
          </div>
        </Modal>
      )}
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
