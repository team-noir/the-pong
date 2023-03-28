import Button from 'components/atoms/Button';
import { useState } from 'react';
import { ChannelType } from 'types/channelType';
import ChannelSettingPassword from './ChannelSettingPassword';
import ChannelSettingTitle from './ChannelSettingTitle';

interface Props {
  channel: ChannelType;
  onClickClose: () => void;
}

export default function ChannelSetting({ channel, onClickClose }: Props) {
  const [isSettingTitle, setIsSettingTitle] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  const handleClickSettingTitle = () => {
    setIsSettingTitle(true);
  };

  const handleClickSettingPassword = () => {
    setIsSettingPassword(true);
  };

  const handleClickBack = () => {
    setIsSettingTitle(false);
    setIsSettingPassword(false);
  };

  return (
    <>
      {!isSettingTitle && !isSettingPassword && (
        <>
          <div>
            <Button type="button" onClick={onClickClose}>
              x
            </Button>
            <h2>채널 설정</h2>
          </div>
          <div>
            <Button type="button" onClick={handleClickSettingTitle}>
              채널 이름 수정 &gt;
            </Button>
            {!channel.isPrivate && (
              <Button type="button" onClick={handleClickSettingPassword}>
                채널 비밀번호 설정 &gt;
              </Button>
            )}
          </div>
        </>
      )}
      {isSettingTitle && (
        <ChannelSettingTitle
          channelTitle={channel.title}
          onClickBack={handleClickBack}
        />
      )}
      {isSettingPassword && (
        <ChannelSettingPassword
          isProtected={channel.isProtected}
          onClickBack={handleClickBack}
        />
      )}
    </>
  );
}
