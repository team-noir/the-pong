import { Fragment, useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType, ChannelUserType } from 'types';
import { classNames } from 'utils';
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
          className="w-full bg-transparent text-white border-0 border-b border-gray py-4 px-2 focus:outline-none focus:ring-gray focus:border-gray focus:rounded"
        />
        <Combobox.Options className="absolute w-full z-50">
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
                    className={classNames(
                      'px-2 py-2 flex items-center space-x-4',
                      isJoined ? 'cursor-pointer' : '',
                      active
                        ? 'bg-gray-dark text-text-light'
                        : 'bg-white text-text-dark'
                    )}
                  >
                    <ProfileImage
                      userId={user.id}
                      nickname={`${user.nickname}`}
                      size={40}
                    />
                    <div
                      className={classNames(
                        'flex-1 flex justify-between items-center',
                        isJoined ? 'text-slate-400' : ''
                      )}
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
