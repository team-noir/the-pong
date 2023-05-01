import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Background from 'components/atoms/Background';
import { BACKGROUND_IMAGES } from 'constants/index';
import QUERY_KEYS from 'constants/queryKeys';

export default function Welcome() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QUERY_KEYS.WHOAMI]);
  }, []);

  return (
    <div className="relative container mx-auto max-w-xl py-24 min-h-screen vh-center">
      <Background imageSrc={BACKGROUND_IMAGES.WELCOME} />
      <div className="relative w-10/12">
        <div className="flex-col vh-center mb-12 w-full text-center">
          <h2 className="section-title">환영합니다!</h2>
          <p>지금 바로 게임을 시작하거나 친구와 대화하세요.</p>
        </div>

        <Link to="/" className="button primary w-full" replace={true}>
          메인으로
        </Link>
      </div>
    </div>
  );
}
