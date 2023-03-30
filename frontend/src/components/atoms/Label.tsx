interface Props {
  id: string;
  label: string;
}

export default function Label({ id, label }: Props) {
  return (
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
  );
}
