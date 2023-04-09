import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const backgroundImageUrl = `${process.env.PUBLIC_URL}/images/welcome-background.png`;

export default function StepWelcome() {
  useEffect(() => {
    const rootDiv = document.getElementById('root');
    if (rootDiv) rootDiv.style.backgroundImage = `url('${backgroundImageUrl}')`;

    return () => {
      if (rootDiv) rootDiv.style.backgroundImage = '';
    };
  }, []);

  return (
    <>
      <div className="mt-[40vh] mb-12 text-center">
        <h2 className="section-title ">환영합니다!</h2>
        <p>지금 바로 게임을 시작하거나 친구와 대화하세요.</p>
      </div>

      <Link to="/" className="button primary w-full">
        메인으로
      </Link>
    </>
  );
}
