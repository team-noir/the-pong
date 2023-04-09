import { useState } from 'react';
import ChannelSettingPassword from 'components/organisms/ChannelSetting/ChannelSettingPassword';
import ChannelSettingTitle from 'components/organisms/ChannelSetting/ChannelSettingTitle';
import Button from 'components/atoms/Button';
import { ChannelFormType, ChannelType } from 'types';

interface Props {
  channel: ChannelType;
  onClickClose: () => void;
  changeChannelSetting: (channelForm: ChannelFormType) => void;
}

export default function ChannelSetting({
  channel,
  onClickClose,
  changeChannelSetting,
}: Props) {
  const [isSettingTitle, setIsSettingTitle] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  const handleClickBack = () => {
    setIsSettingTitle(false);
    setIsSettingPassword(false);
  };

  const handleSubmitTitle = (title: string) => {
    changeChannelSetting({ id: channel.id, title });
  };

  const handleSubmitPassword = (password: string) => {
    changeChannelSetting({ id: channel.id, password });
  };

  return (
    <>
      {!isSettingTitle && !isSettingPassword && (
        <>
          <div>
            <Button onClick={onClickClose}>x</Button>
            <h2>채널 설정</h2>
          </div>
          <div>
            <Button onClick={() => setIsSettingTitle(true)}>
              채널 이름 수정 &gt;
            </Button>
            {!channel.isPrivate && (
              <Button onClick={() => setIsSettingPassword(true)}>
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
          onSubmit={handleSubmitTitle}
        />
      )}
      {isSettingPassword && (
        <ChannelSettingPassword
          isProtected={channel.isProtected}
          onClickBack={handleClickBack}
          onSubmit={handleSubmitPassword}
        />
      )}
    </>
  );
}
