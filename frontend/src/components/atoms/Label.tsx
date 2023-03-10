interface Props {
  id: string;
  label: string;
}

export default function Label({ id, label }: Props) {
  return <label htmlFor={id}>{label}</label>;
}
