import styles from 'assets/styles/ChannelLobby.module.css';
import ChannelList from 'components/molecule/ChannelList';
import { ChannelType } from 'types/channelType';
import { Link } from 'react-router-dom';

interface Props {
  channels: ChannelType[] | null;
  onClick: (channelId: number) => void;
}

export default function ChannelLobby({ channels, onClick }: Props) {
  return (
    <>
      <h1>채널</h1>
      <div>
        <Link to="/channel/browse">채널 둘러보기</Link>
        <Link to="/channel/new">새 채널 만들기</Link>
      </div>
      <h1>입장 중인 채널 목록</h1>
      <ChannelList styles={styles} channels={channels} onClick={onClick} />
    </>
  );
}
