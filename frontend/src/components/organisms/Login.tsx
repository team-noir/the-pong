import { useMutation, useQueryClient } from '@tanstack/react-query';
import { anonymousLogin, API_LOGIN_FT } from 'api/api.v1';
import Button from 'components/atoms/Button';
import Background from 'components/atoms/Background';
import { BACKGROUND_IMAGES } from 'constants/index';
import logo42 from 'assets/images/logo_42.svg';
import QUERY_KEYS from 'constants/queryKeys';

export default function Login() {
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
          <p>Table Tennis, Conversation and Revenges</p>
        </div>
        <div className="flex-col vh-center gap-2 w-full">
          <Button
            logoImageUrl={logo42}
            onClick={() => (window.location.href = API_LOGIN_FT)}
            primary
            fullLength
          >
            42로 로그인하기
          </Button>
          {/* TODO: 익명 로그인 버튼 삭제 */}
          <Button
            onClick={() => anonymousLoginMutation.mutate()}
            linkStyle
            fullLength
          >
            로그인 없이 둘러보기
          </Button>
        </div>
      </div>
    </main>
  );
}
