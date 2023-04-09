interface Props {
  id: string;
  label: string;
}

export default function Label({ id, label }: Props) {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium w-full py-4 ml-2 text-text-light"
    >
      {label}
    </label>
  );
}
