import styles from 'assets/styles/Channel.module.css';
import ChannelList from 'components/molecule/ChannelList';
import { useEffect, useState } from 'react';
import { ChannelType } from 'types/channelType';
import { RoleType } from 'types/channelUserType';

const dummyChannels: ChannelType[] = [
  {
    id: 1,
    title: 'public test',
    isProtected: false,
    isPrivate: false,
    isDm: false,
    users: [
      {
        id: 1,
        nickname: 'heehkim',
        role: RoleType.owner,
        isMuted: false,
      },
      {
        id: 2,
        nickname: 'cpak',
        role: RoleType.normal,
        isMuted: false,
      },
      {
        id: 3,
        nickname: 'sarchoi',
        role: RoleType.admin,
        isMuted: false,
      },
      {
        id: 4,
        nickname: 'hello',
        role: RoleType.admin,
        isMuted: false,
      },
    ],
  },
  {
    id: 2,
    title: 'protected test',
    isProtected: true,
    isPrivate: false,
    isDm: false,
    users: [
      {
        id: 3,
        nickname: 'sarchoi',
        role: RoleType.owner,
        isMuted: false,
      },
      {
        id: 4,
        nickname: 'hello',
        role: RoleType.normal,
        isMuted: false,
      },
    ],
  },
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
