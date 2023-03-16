import styles from 'assets/styles/Channel.module.css';
import ChannelList from 'components/molecule/ChannelList';
import { useEffect, useState } from 'react';
import { ChannelType } from 'types/channelType';

const dummyChannels: ChannelType[] = [
  { id: '0', title: '게임 할 사람', channelCode: '1234' },
  { id: '1', title: '수다 떨어요', channelCode: '0000' },
];

export default function ChannelBrowse() {
  const [channels, setChannels] = useState<ChannelType[] | null>(null);

  useEffect(() => {
    // TODO: 전체 채널 목록 API에서 가져오기
    setChannels(dummyChannels);
  }, []);

  return (
    <>
      <ChannelList styles={styles} channels={channels} />
    </>
  );
}
