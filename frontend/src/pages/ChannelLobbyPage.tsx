import ChannelLobby from 'components/organisms/ChannelLobby';
import { useNavigate } from 'react-router-dom';
import { ChannelType } from 'types/channelType';
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

export default function ChannelLobbyPage() {
  const navigate = useNavigate();

  const handleClickChannel = (channelId: number) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <>
      <h1>ChannelLobbyPage</h1>
      <ChannelLobby
        channels={dummyChannels.filter((channel) =>
          channel.users?.find((user) => user.id === 1)
        )}
        onClick={handleClickChannel}
      />
    </>
  );
}
