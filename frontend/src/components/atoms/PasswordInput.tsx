interface Props {
  id: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ id, value, onChange, onBlur }: Props) {
  return (
    <input
      type="password"
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
