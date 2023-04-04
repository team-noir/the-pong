import { ChannelType } from 'types';

interface Props {
  styles: { readonly [key: string]: string };
  channel: ChannelType;
  onClick?: (channel: ChannelType) => void;
}

export default function Channel({ styles, channel, onClick }: Props) {
  return (
    <li className={styles.li} onClick={() => onClick && onClick(channel)}>
      <span>{channel.title}</span>
      {!channel.isDm && <span>{channel.userCount}명</span>}
    </li>
  );
}
