import RadioInput from 'components/atoms/RadioInput';
import Label from 'components/atoms/Label';

interface Props {
  id: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioInputWithLabel({
  id,
  label,
  value,
  checked = false,
  onChange,
}: Props) {
  return (
    <div className="flex items-center">
      <RadioInput id={id} value={value} checked={checked} onChange={onChange} />
      <Label id={id} label={label} className="mr-4" />
    </div>
  );
}
