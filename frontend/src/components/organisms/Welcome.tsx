import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BACKGROUND_IMAGES } from 'constants/index';

export default function Welcome() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const rootDiv = document.getElementById('root');
    if (rootDiv)
      rootDiv.style.backgroundImage = `url('${BACKGROUND_IMAGES.WELCOME}')`;

    queryClient.invalidateQueries(['whoami']);
    return () => {
      if (rootDiv) rootDiv.style.backgroundImage = '';
    };
  }, []);

  return (
    <>
      <div className="mt-[40vh] mb-12 text-center">
        <h2 className="section-title">환영합니다!</h2>
        <p>지금 바로 게임을 시작하거나 친구와 대화하세요.</p>
      </div>

      <Link to="/" className="button primary w-full" replace={true}>
        메인으로
      </Link>
    </>
  );
}
