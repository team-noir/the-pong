import Label from 'components/atoms/Label';
import TextInput from 'components/atoms/TextInput';
import { UserType } from 'types/userType';

interface Props {
  id: string;
  label?: string;
  value: string;
  placeholder?: string;
  listId: string;
  dataList?: UserType[];
  setValue: (value: string) => void;
  onSelect?: (value: string) => void;
}

export default function TextInputWithDataList({
  id,
  label,
  value,
  placeholder,
  listId,
  dataList,
  setValue,
  onSelect,
}: Props) {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValue(value);
    onSelect && onSelect(value);
  };

  return (
    <>
      {label && <Label id={id} label={label} />}
      <TextInput
        id={id}
        value={value}
        placeholder={placeholder}
        listId={listId}
        onChange={handleChange}
      />
      <datalist id={listId}>
        {dataList?.map((user) => (
          <option key={user.id} value={user.nickname} />
        ))}
      </datalist>
    </>
  );
}
