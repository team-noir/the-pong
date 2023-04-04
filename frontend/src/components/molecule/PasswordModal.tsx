import { useEffect, useRef, useState } from 'react';
import Button from 'components/atoms/Button';
import PasswordInput from 'components/atoms/PasswordInput';

interface Props {
  onClose: () => void;
  onSubmit: (password: string) => void;
  children?: React.ReactNode;
}

export default function PasswordModal({ onClose, onSubmit, children }: Props) {
  const [password, setPassword] = useState('');
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: React.BaseSyntheticEvent | MouseEvent) => {
    if (!modalRef.current?.contains(e.target)) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} ref={modalRef}>
      <Button type="button" onClick={onClose}>
        x
      </Button>
      <p>{children}</p>
      <PasswordInput id="password" value={password} onChange={handleChange} />
      <div>
        <Button type="submit">확인</Button>
      </div>
    </form>
  );
}
