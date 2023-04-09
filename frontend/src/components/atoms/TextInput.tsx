interface Props {
  id: string;
  value?: string;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  listId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  fullLength?: boolean;
}

export default function TextInput({
  id,
  value,
  placeholder,
  autoComplete = 'off',
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
      autoComplete={autoComplete}
      list={listId}
      onChange={onChange}
      onBlur={onBlur}
      className={`${
        fullLength ? 'w-full' : ''
      } bg-transparent text-white border-0 border-b border-gray py-4 px-2 focus:outline-none focus:ring-gray focus:border-gray focus:rounded`}
    />
  );
}
