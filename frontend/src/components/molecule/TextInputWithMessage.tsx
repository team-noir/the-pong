import React, { useState, useEffect } from 'react';
import Label from 'components/atoms/Label';
import TextInput from 'components/atoms/TextInput';
import Message from 'components/atoms/Message';

interface Props {
  type?: 'text' | 'password';
  id: string;
  label?: string;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  validate: (value: string) => boolean;
  isAvailable?: boolean;
  checkAvailable?: (value: string) => void;
  message: string;
}

export default function TextInputWithMessage({
  type = 'text',
  id,
  label,
  value,
  placeholder,
  setValue,
  isValid,
  setIsValid,
  validate,
  message,
  isAvailable = true,
  checkAvailable,
}: Props) {
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setIsValid(validate(value));
  }, []);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setIsTouched(true);
    setValue(value);
    setIsValid(validate(value));
    checkAvailable && checkAvailable(value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className="w-full group mb-6">
      {label && (
        <div className="mb-2">
          <Label id={id} label={label} />
        </div>
      )}
      <TextInput
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        fullLength
      />

      <Message
        isShow={(!isValid || !isAvailable) && isTouched}
        message={message}
      />
    </div>
  );
}
