import React from 'react';

interface Props {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxInput({ id, checked, onChange }: Props) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-green bg-gray-100 border-gray-300 rounded focus:ring-green focus:ring-2"
    />
  );
}
