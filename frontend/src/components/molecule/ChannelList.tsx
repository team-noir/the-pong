import { ChannelType } from 'types/channelType';
import ChannelItem from './ChannelItem';

interface Props {
  styles: { readonly [key: string]: string };
  channels: ChannelType[] | null;
}

export default function ChannelList({ styles, channels }: Props) {
  return (
    <ul className={styles.ul}>
      {channels &&
        channels.map((channel) => {
          return (
            <ChannelItem key={channel.id} styles={styles} channel={channel} />
          );
        })}
    </ul>
  );
}
