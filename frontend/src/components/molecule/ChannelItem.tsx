import { ChannelType } from 'types/channelType';

interface Props {
  styles: { readonly [key: string]: string };
  channel: ChannelType;
  onClick?: (channelId: number) => void;
}

export default function Channel({ styles, channel, onClick }: Props) {
  return (
    <li className={styles.li} onClick={() => onClick && onClick(channel.id)}>
      {channel.title}
    </li>
  );
}
