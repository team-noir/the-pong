import { Link } from 'react-router-dom';

export default function MainChannels() {
  return (
    <section>
      <h2>Channels</h2>
      <Link to="/channel/new">채널 만들기</Link>
    </section>
  );
}
