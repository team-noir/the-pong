import { Link } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

interface Props {
  styles: { readonly [key: string]: string };
  channel: ChannelType;
}

export default function Channel({ styles, channel }: Props) {
  return (
    <Link to={`/channel/${channel.channelCode}`}>
      <li className={styles.li}>{channel.title}</li>
    </Link>
  );
}
