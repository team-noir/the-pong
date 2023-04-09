import ChannelList from 'components/molecule/ChannelList';
import { ChannelType } from 'types';
import ChannelButtons from 'components/organisms/ChannelButtons';

interface Props {
  channels: ChannelType[] | null;
  onClick: (channel: ChannelType) => void;
}

export default function ChannelLobby({ channels, onClick }: Props) {
  return (
    <>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
      <section className="section">
        <h2 className="section-title">입장 중인 채널 목록</h2>
        {channels?.length ? (
          <ChannelList channels={channels} onClick={onClick} />
        ) : (
          <div>입장 중인 채널이 없습니다.</div>
        )}
      </section>
    </>
  );
}
