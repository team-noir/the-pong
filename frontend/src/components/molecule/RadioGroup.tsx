import RadioInputWithLabel from 'components/molecule/RadioInputWithLabel';

interface Props {
  values: string[] | number[];
  selectedValue: string | number;
  setValue: (value: string) => void;
}

export default function RadioGroup({ values, selectedValue, setValue }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  return (
    <div className="flex">
      {values.map((value) => {
        return (
          <RadioInputWithLabel
            key={value}
            id={value.toString()}
            label={value.toString()}
            value={value.toString()}
            checked={value === selectedValue}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
}
