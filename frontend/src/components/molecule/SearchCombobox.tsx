import { UserType } from 'types/userType';
import { Combobox } from '@headlessui/react';
import ProfileImage from 'components/atoms/ProfileImage';
import { Fragment, useEffect, useState } from 'react';
import { ChannelUserType } from 'types/channelUserType';

interface Props {
  placeholder?: string;
  dataList?: UserType[];
  channelUsers?: ChannelUserType[];
  setValue: (value: string) => void;
  onSelect?: (value: string) => void;
}

export default function SearchCombobox({
  placeholder,
  dataList,
  channelUsers,
  setValue,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    onSelect && onSelect(selected);
    setSelected('');
  }, [selected]);

  return (
    <>
      <Combobox value={selected} onChange={setSelected}>
        <Combobox.Input
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
        <Combobox.Options className="absolute w-1/2">
          {dataList?.map((user) => {
            const isJoined = channelUsers?.some(
              (channelUser) => channelUser.id === user.id
            );

            return (
              <Combobox.Option
                key={user.id}
                value={user.nickname}
                as={Fragment}
                disabled={isJoined}
              >
                {({ active }) => (
                  <li
                    className={`flex ${isJoined ? '' : 'cursor-pointer'} ${
                      active
                        ? 'bg-gray-dark text-text-light'
                        : 'bg-white text-text-dark'
                    }`}
                  >
                    <ProfileImage
                      userId={user.id}
                      alt={`${user.nickname}'s profile image`}
                      size={40}
                    />
                    <div
                      className={`flex-1 flex justify-between items-center ${
                        isJoined ? 'text-slate-400' : ''
                      }`}
                    >
                      <span>{user.nickname}</span>
                      <span className="text-xs">
                        {isJoined && '이미 참여중'}
                      </span>
                    </div>
                  </li>
                )}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </>
  );
}
