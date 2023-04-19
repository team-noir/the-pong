import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getUsers } from 'api/api.v1';
import UserList from 'components/molecule/UserList';
import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';

export default function Search() {
  const [inputText, setInputText] = useState<string>('');

  const getUsersMutation = useMutation(getUsers);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    getUsersMutation.mutate(inputText);
  };

  return (
    <section>
      <h1 className="section-title">회원 검색</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="search"
          placeholder="닉네임을 입력해주세요"
          onChange={handleChange}
        />
        <Button type="submit">검색</Button>
      </form>
      {getUsersMutation.isSuccess && (
        <>
          {getUsersMutation.data.length ? (
            <UserList users={getUsersMutation.data} imageSize={52} />
          ) : (
            <p className="mt-4">검색 결과가 없습니다.</p>
          )}
        </>
      )}
    </section>
  );
}
