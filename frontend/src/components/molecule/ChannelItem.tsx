import { ChannelType } from 'types';

interface Props {
  channel: ChannelType;
  onClick?: (channel: ChannelType) => void;
}

export default function Channel({ channel, onClick }: Props) {
  return (
    <li
      onClick={() => onClick && onClick(channel)}
      className="pl-2 pr-2 pb-4 mb-4 border-b border-b-gray cursor-pointer"
    >
      <h5 className="text-xl">{channel.title}</h5>
      {!channel.isDm && <span className="text-sm">{channel.userCount}명</span>}
    </li>
  );
}
