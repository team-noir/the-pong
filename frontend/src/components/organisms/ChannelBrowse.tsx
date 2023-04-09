import ChannelList from 'components/molecule/ChannelList';
import { ChannelType } from 'types';

interface Props {
  channels: ChannelType[];
  onClick: (channel: ChannelType) => void;
}

export default function ChannelBrowse({ channels, onClick }: Props) {
  return (
    <>
      {channels?.length ? (
        <ChannelList channels={channels} onClick={onClick} />
      ) : (
        <div>생성된 채널이 없습니다.</div>
      )}
    </>
  );
}
