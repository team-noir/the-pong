import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getUsers } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserList from 'components/molecule/UserList';
import TextInput from 'components/atoms/TextInput';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import QUERY_KEYS from 'constants/queryKeys';

export default function Search() {
  const [inputText, setInputText] = useState<string>('');

  const { data, isFetching, fetchNextPage, refetch, remove } = useInfiniteQuery(
    {
      queryKey: [QUERY_KEYS.USERS],
      queryFn: ({ pageParam = null }) =>
        getUsers({ q: inputText, paging: { cursor: pageParam } }),
      getNextPageParam: ({ paging }) => paging.nextCursor,
      enabled: false,
    }
  );

  const users = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    remove();
    refetch();
  };

  return (
    <section className="section">
      <h1 className="section-title">회원 검색</h1>
      <form onSubmit={handleSubmit} className="inline-flex w-full mb-6">
        <div className="w-10/12 vh-center pr-2">
          <TextInput
            id="search"
            placeholder="닉네임을 입력해주세요"
            onChange={handleChange}
            fullLength
          />
        </div>
        <div className="w-2/12 vh-center pl-2">
          <Button type="submit" primary fullLength>
            검색
          </Button>
        </div>
      </form>
      <div>
        {isFetching && !data ? (
          <Spinner className="flex justify-center mt-2 mb-8" />
        ) : users.length ? (
          <InfiniteScroll
            next={fetchNextPage}
            style={{ overflow: 'unset' }}
            hasMore={hasMore}
            dataLength={users.length}
            loader={<Spinner className="flex justify-center pt-2 pb-8" />}
          >
            <UserList users={users} imageSize={52} />
          </InfiniteScroll>
        ) : (
          <p className="text-center mt-4">검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
