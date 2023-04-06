import { ChannelType } from 'types';

interface Props {
  channel: ChannelType;
  onClick?: (channel: ChannelType) => void;
}

export default function Channel({ channel, onClick }: Props) {
  return (
    <li onClick={() => onClick && onClick(channel)}>
      <span>{channel.title}</span>
      {!channel.isDm && <span>{channel.userCount}명</span>}
    </li>
  );
}
