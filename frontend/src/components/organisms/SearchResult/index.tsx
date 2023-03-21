import { useEffect, useState } from 'react';
import { UserType } from 'types/userType';
import SearchResultList from './SearchResultList';

const dummyResultUsers: UserType[] = [
  {
    id: 2,
    nickname: '결과닉네임2',
    status: 'on',
  },
  {
    id: 3,
    nickname: '결과닉네임3',
    status: 'on',
  },
  {
    id: 4,
    nickname: '결과닉네임4',
    status: 'off',
  },
  {
    id: 5,
    nickname: '결과닉네임5',
    status: 'game',
  },
];

export default function SearchResult() {
  const [users, setUsers] = useState<UserType[] | null>(null);

  // TODO: 검색 결과 목록 API에서 가져오기
  useEffect(() => {
    setUsers(dummyResultUsers);
  }, []);

  return (
    <>
      <h1>검색 결과</h1>
      <SearchResultList users={users} />
    </>
  );
}
