import { UserType } from 'types/userType';
import { Combobox } from '@headlessui/react';
import ProfileImage from 'components/atoms/ProfileImage';
import { Fragment, useEffect, useState } from 'react';

interface Props {
  placeholder?: string;
  dataList?: UserType[];
  setValue: (value: string) => void;
  onSelect?: (value: string) => void;
}

export default function SearchCombobox({
  placeholder,
  dataList,
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
          className="text-text-dark"
        />
        <Combobox.Options className="absolute w-1/2">
          {dataList?.map((user) => (
            <Combobox.Option key={user.id} value={user.nickname} as={Fragment}>
              {({ active }) => (
                <li
                  className={`${
                    active ? 'bg-gray-dark' : 'bg-white text-text-dark'
                  }`}
                >
                  <ProfileImage
                    userId={user.id}
                    alt={`${user.nickname}'s profile image`}
                    size={40}
                  />
                  {user.nickname}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </>
  );
}
