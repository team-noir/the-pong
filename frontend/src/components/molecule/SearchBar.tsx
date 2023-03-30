import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';

export default function SearchBar() {
  const [inputText, setInputText] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setInputText('');
    e.currentTarget.reset();
    navigate({
      pathname: '/search',
      search: createSearchParams({ q: [inputText] }).toString(),
    });
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <TextInput
          id="search"
          placeholder="닉네임을 입력해주세요"
          onChange={handleChange}
        />
        <Button type="submit">검색</Button>
      </form>
    </div>
  );
}
