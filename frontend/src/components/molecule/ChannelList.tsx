import ChannelItem from 'components/molecule/ChannelItem';
import { ChannelType } from 'types';

interface Props {
  channels: ChannelType[] | null;
  onClick?: (channel: ChannelType) => void;
}

export default function ChannelList({ channels, onClick }: Props) {
  return (
    <ul className="pt-4 border-t border-t-gray">
      {channels &&
        channels.map((channel) => {
          return (
            <ChannelItem key={channel.id} channel={channel} onClick={onClick} />
          );
        })}
    </ul>
  );
}
