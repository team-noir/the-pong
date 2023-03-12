import { Link } from 'react-router-dom';

export default function StepWelcome() {
  return (
    <div>
      <h2>환영합니다.</h2>
      <p>지금 바로 게임을 시작하거나 친구와 만나보세요.</p>
      <div>
        <img src="https://placekitten.com/800/800" alt="welcom image" />
      </div>
      <Link to="/">메인으로</Link>
    </div>
  );
}
