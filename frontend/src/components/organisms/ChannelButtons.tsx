import { Link } from 'react-router-dom';

export default function ChannelButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Link to="/channel/browse" className="button primary w-full">
        채널 둘러보기
      </Link>
      <Link to="/channel/new" className="button secondary w-full">
        채널 만들기
      </Link>
    </div>
  );
}
