interface Props {
  id: string;
  value: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInput({
  id,
  value,
  checked = false,
  onChange,
}: Props) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className="mr-2 text-green focus:ring-green focus:ring-2"
    />
  );
}
