import { useEffect, useRef, useState } from 'react';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';
import TextInput from 'components/atoms/TextInput';

interface Props {
  onClose: () => void;
  onSubmit: (password: string) => void;
}

export default function PasswordModal({ onClose, onSubmit }: Props) {
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
    <Modal onClickClose={onClose}>
      <form onSubmit={handleSubmit} ref={modalRef}>
        <p className="mb-4">비밀번호 입력이 필요한 채널입니다.</p>
        <TextInput
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChange}
          fullLength
        />
        <div className="mt-4">
          <Button type="submit" primary fullLength>
            확인
          </Button>
        </div>
      </form>
    </Modal>
  );
}
