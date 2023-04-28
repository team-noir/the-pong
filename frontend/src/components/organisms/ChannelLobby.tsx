import { useNavigate } from 'react-router-dom';
import ChannelButtons from 'components/organisms/ChannelButtons';
import ChannelList from 'components/molecule/ChannelList';
import { ChannelType } from 'types';

interface Props {
  channels: ChannelType[];
}

export default function ChannelLobby({ channels }: Props) {
  const navigate = useNavigate();

  const handleClickChannel = (channel: ChannelType) => {
    navigate(`/channel/${channel.id}`);
  };

  return (
    <>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
      <section className="section">
        <h2 className="section-title">입장 중인 채널 목록</h2>
        {channels.length ? (
          <ChannelList channels={channels} onClick={handleClickChannel} />
        ) : (
          <div>입장 중인 채널이 없습니다.</div>
        )}
      </section>
    </>
  );
}
