interface Props {
  id: string;
  value?: string;
  placeholder?: string;
  listId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  id,
  value,
  placeholder,
  listId,
  onChange,
  onBlur,
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
    />
  );
}
