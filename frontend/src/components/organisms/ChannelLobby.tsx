import styles from 'assets/styles/ChannelLobby.module.css';
import ChannelList from 'components/molecule/ChannelList';
import { ChannelType } from 'types/channelType';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const dummyChannels: ChannelType[] = [
  { id: '0', title: '게임 할 사람', channelCode: '1234' },
  { id: '1', title: '수다 떨어요', channelCode: '0000' },
];

export default function ChannelLobby() {
  const [channels, setChannels] = useState<ChannelType[] | null>(null);

  useEffect(() => {
    // TODO: 현재 유저가 입장한 채널 목록 API에서 가져오기
    setChannels(dummyChannels);
  }, []);

  return (
    <>
      <h1>채널</h1>
      <div>
        <Link to="/channel/browse">채널 둘러보기</Link>
        <Link to="/channel/new">새 채널 만들기</Link>
      </div>
      <h1>입장 중인 채널 목록</h1>
      <ChannelList styles={styles} channels={channels} />
    </>
  );
}
