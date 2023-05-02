import { useState } from 'react';
import { updateChannelSetting } from 'api/rest.v1';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from 'components/templates/Modal';
import ChannelSettingPassword from 'components/organisms/Channel/ChannelSetting/ChannelSettingPassword';
import ChannelSettingTitle from 'components/organisms/Channel/ChannelSetting/ChannelSettingTitle';
import { ChannelType } from 'types';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  channel: ChannelType;
  onClickClose: () => void;
}

export default function ChannelSetting({ channel, onClickClose }: Props) {
  const queryClient = useQueryClient();
  const [isSettingTitle, setIsSettingTitle] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);

  const handleClickBack = () => {
    setIsSettingTitle(false);
    setIsSettingPassword(false);
  };

  const updateChannelSettingMutation = useMutation({
    mutationFn: updateChannelSetting,
    onSuccess: async () => {
      onClickClose();
      queryClient.invalidateQueries([QUERY_KEYS.CHANNEL, String(channel.id)]);
    },
  });

  const handleSubmitTitle = (title: string) => {
    updateChannelSettingMutation.mutate({ id: channel.id, title });
  };

  const handleSubmitPassword = (password: string) => {
    updateChannelSettingMutation.mutate({ id: channel.id, password });
  };

  return (
    <Modal
      onClickClose={onClickClose}
      isShowClose={!(isSettingTitle || isSettingPassword)}
    >
      {!isSettingTitle && !isSettingPassword && (
        <section className="section small">
          <h3 className="section-title">채널 설정</h3>
          <ul className="flex flex-col divide-y divide-gray-dark -mx-4">
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
        <div className="mt-10">
          <ChannelSettingTitle
            channelTitle={channel.title}
            onClickBack={handleClickBack}
            onSubmit={handleSubmitTitle}
          />
        </div>
      )}
      {isSettingPassword && (
        <div className="mt-10">
          <ChannelSettingPassword
            isProtected={channel.isProtected}
            onClickBack={handleClickBack}
            onSubmit={handleSubmitPassword}
          />
        </div>
      )}
    </Modal>
  );
}
