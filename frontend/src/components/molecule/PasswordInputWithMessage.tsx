import React, { useState, useEffect } from 'react';
import Label from 'components/atoms/Label';
import PasswordInput from 'components/atoms/PasswordInput';
import Message from 'components/atoms/Message';

interface Props {
  id: string;
  label?: string;
  value: string;
  setValue: (value: string) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  validate: (value: string) => boolean;
  message: string;
}

export default function PasswordInputWithMessage({
  id,
  label,
  value,
  setValue,
  isValid,
  setIsValid,
  validate,
  message,
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
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <>
      {label && <Label id={id} label={label} />}
      <PasswordInput
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Message isShow={!isValid && isTouched} message={message} />
    </>
  );
}
