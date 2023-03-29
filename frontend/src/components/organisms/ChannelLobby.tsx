import styles from 'assets/styles/ChannelLobby.module.css';
import ChannelList from 'components/molecule/ChannelList';
import { ChannelType } from 'types/channelType';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoleType } from 'types/channelUserType';

export const dummyChannels: ChannelType[] = [
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
  {
    id: 3,
    title: 'private test',
    isProtected: false,
    isPrivate: true,
    isDm: false,
    users: [
      {
        id: 1,
        nickname: 'heehkim',
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
  {
    id: 4,
    title: 'dm test',
    isProtected: false,
    isPrivate: false,
    isDm: true,
    users: [
      {
        id: 1,
        nickname: 'heehkim',
        role: RoleType.normal,
        isMuted: false,
      },
      {
        id: 3,
        nickname: 'sarchoi',
        role: RoleType.normal,
        isMuted: false,
      },
    ],
  },
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
