import { ChannelType } from 'types/channelType';

interface Props {
  styles: { readonly [key: string]: string };
  channel: ChannelType;
  onClick?: (channel: ChannelType) => void;
}

export default function Channel({ styles, channel, onClick }: Props) {
  return (
    <li className={styles.li} onClick={() => onClick && onClick(channel)}>
      {channel.title}aa
    </li>
  );
}
