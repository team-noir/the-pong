import CheckboxInput from 'components/atoms/CheckboxInput';
import Label from 'components/atoms/Label';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  setValue: (value: boolean) => void;
  message?: string;
}

export default function CheckboxInputWithLabel({
  id,
  label,
  checked,
  setValue,
}: Props) {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    setValue(checked);
  };

  return (
    <div className="flex items-center pl-4">
      <CheckboxInput id={id} checked={checked} onChange={handleChange} />
      <Label id={id} label={label} className="py-4 ml-2" />
    </div>
  );
}
