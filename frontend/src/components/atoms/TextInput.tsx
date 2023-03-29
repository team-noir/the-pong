interface Props {
  id: string;
  value?: string;
  placeholder?: string;
  listId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  fullLength?: boolean;
}

export default function TextInput({
  id,
  value,
  placeholder,
  listId,
  onChange,
  onBlur,
  fullLength = false,
}: Props) {
  return (
    <input
      type="text"
      id={id}
      value={value}
      placeholder={placeholder}
      list={listId}
      onChange={onChange}
      onBlur={onBlur}
      className={`${
        fullLength ? 'w-full' : ''
      } bg-transparent text-white border-0 border-b border-gray py-2 px-1 focus:outline-none focus:border-blue-500`}
    />
  );
}
