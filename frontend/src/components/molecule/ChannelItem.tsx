import ProfileImage from 'components/atoms/ProfileImage';
import { ChannelType } from 'types';
import { classNames } from 'utils';

interface Props {
  channel: ChannelType;
  onClick?: (channel: ChannelType) => void;
}

export default function Channel({ channel, onClick }: Props) {
  return (
    <li
      onClick={() => onClick && onClick(channel)}
      className={classNames(
        'pl-2 pr-2 pb-4 mb-4 border-b border-b-gray cursor-pointer',
        channel.isDm && 'flex justify-between items-center'
      )}
    >
      <h5 className="text-xl">{channel.title}</h5>
      {!channel.isDm && <span className="text-sm">{channel.userCount}명</span>}
      {channel.isDm && channel.dmUserId && (
        <ProfileImage
          userId={channel.dmUserId}
          nickname={channel.title}
          size={40}
        />
      )}
    </li>
  );
}
