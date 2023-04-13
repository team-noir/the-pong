interface Props {
  type?: 'text' | 'password';
  id: string;
  value?: string;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  listId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  fullLength?: boolean;
  disabled?: boolean;
}

export default function TextInput({
  type = 'text',
  id,
  value,
  placeholder,
  autoComplete = 'off',
  listId,
  onChange,
  onBlur,
  fullLength = false,
  disabled = false,
}: Props) {
  return (
    <input
      type={type}
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
      disabled={disabled}
    />
  );
}
