import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { anonymousLogin, API_LOGIN_GOOGLE } from 'api/rest.v1';
import Button from 'components/atoms/Button';
import Background from 'components/atoms/Background';
import Spinner from 'components/atoms/Spinner';
import { BACKGROUND_IMAGES } from 'constants/index';
import QUERY_KEYS from 'constants/queryKeys';
import logoGoogle from 'assets/images/logo_google.svg';

export default function Login() {
  const [isGoogleLoginClicked, setIsGoogleLoginClicked] = useState(false);
  const queryClient = useQueryClient();

  const anonymousLoginMutation = useMutation(anonymousLogin, {
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.WHOAMI]),
  });

  return (
    <main className="relative container mx-auto max-w-xl py-24 min-h-screen vh-center">
      <Background imageSrc={BACKGROUND_IMAGES.WELCOME} />
      <div className="relative w-10/12">
        <div className="flex-col vh-center gap-3 mb-12 w-full">
          <h1 className="text-3xl">The Pong</h1>
          <p>게임와 대화 그리고 복수</p>
        </div>
        <div className="flex-col vh-center gap-2 w-full">
          {isGoogleLoginClicked ? (
            <Button primary fullLength disabled>
              <Spinner className="h-7" />
            </Button>
          ) : (
            <Button
              logoImageUrl={logoGoogle}
              onClick={() => {
                setIsGoogleLoginClicked(true);
                window.location.href = API_LOGIN_GOOGLE;
              }}
              primary
              fullLength
            >
              구글로 로그인하기
            </Button>
          )}
          {/* TODO: 익명 로그인 버튼 삭제 */}
          <Button
            onClick={() => anonymousLoginMutation.mutate()}
            linkStyle
            fullLength
          >
            임시 프로필로 둘러보기
          </Button>
        </div>
      </div>
    </main>
  );
}
