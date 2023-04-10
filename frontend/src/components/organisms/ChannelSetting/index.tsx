import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Modal from 'components/templates/Modal';
import ChannelSettingPassword from 'components/organisms/ChannelSetting/ChannelSettingPassword';
import ChannelSettingTitle from 'components/organisms/ChannelSetting/ChannelSettingTitle';
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
    <Modal onClickClose={onClickClose}>
      {!isSettingTitle && !isSettingPassword && (
        <section className="section small">
          <h3 className="section-title">채널 설정</h3>
          <ul className="flex flex-col divide-y divide-gray-dark py-4 -mx-4">
            <li
              role="button"
              onClick={() => setIsSettingTitle(true)}
              className="px-6 py-5 text-xl flex items-center"
            >
              <span>채널 이름 수정</span>
              <ChevronRightIcon
                className="w-5 h-5 ml-auto"
                aria-hidden="true"
              />
            </li>
            {!channel.isPrivate && (
              <li
                role="button"
                onClick={() => setIsSettingPassword(true)}
                className="px-6 py-5 text-xl flex items-center"
              >
                <span>채널 비밀번호 설정</span>
                <ChevronRightIcon
                  className="w-5 h-5 ml-auto"
                  aria-hidden="true"
                />
              </li>
            )}
          </ul>
        </section>
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
    </Modal>
  );
}
