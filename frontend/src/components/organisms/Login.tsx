import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { anonymousLogin, API_LOGIN_FT } from 'api/api.v1';
import Button from 'components/atoms/Button';
import { BACKGROUND_IMAGES } from 'constants/index';
import logo42 from 'assets/images/logo_42.svg';
import { classNames } from 'utils';

export default function Login() {
  const queryClient = useQueryClient();

  const anonymousLoginMutation = useMutation(anonymousLogin, {
    onSuccess: () => queryClient.invalidateQueries(['whoami']),
  });

  const handleClick = () => {
    window.location.href = API_LOGIN_FT;
  };

  return (
    <main className="relative container mx-auto max-w-xl py-24 min-h-screen vh-center">
      <Background imageSrc={BACKGROUND_IMAGES.WELCOME} />
      <div className="relative w-10/12">
        <div className="flex-col vh-center gap-3 mt-40 mb-60 w-full">
          <h1 className="text-3xl">The Pong</h1>
          <p>Table Tennis, Conversation and Revenges</p>
        </div>
        <div className="flex-col vh-center gap-2 w-full">
          <Button
            logoImageUrl={logo42}
            onClick={handleClick}
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

function Background({ imageSrc }: { imageSrc?: string }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className={classNames(
        'absolute top-0 left-0 w-full h-full select-none bg-cover bg-center bg-no-repeat transition-opacity duration-[3000ms] opacity-0',
        isImageLoaded && 'opacity-100'
      )}
      style={{
        backgroundImage: isImageLoaded ? `url(${imageSrc})` : '',
      }}
    >
      <img src={imageSrc} className="hidden" onLoad={handleOnLoad} />
    </div>
  );
}
