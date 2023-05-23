import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAchievements } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'components/atoms/Spinner';
import { AchievementType } from 'types';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  userId: number;
}

export default function Achievements({ userId }: Props) {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.ACHIEVEMENTS, String(userId)],
    queryFn: ({ pageParam = null }) =>
      getAchievements({ userId, paging: { cursor: pageParam, size: 1 } }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    useErrorBoundary: (error: AxiosError) => {
      if (error && error.response?.status === 404) return false;
      return true;
    },
    suspense: false,
  });

  const achievements = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  return (
    <section className="section">
      <h2 className="section-title">업적</h2>
      {isFetching && !data ? (
        <Spinner className="flex justify-center mt-2 mb-8" />
      ) : achievements.length ? (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasMore}
          dataLength={achievements.length}
          loader={<Spinner className="flex justify-center pt-2 pb-8" />}
          scrollThreshold={0.7}
        >
          <AchievementList achievements={achievements} />
        </InfiniteScroll>
      ) : (
        <p className="block mt-4 text-center text-gray">
          게임을 플레이하고 업적을 달성해보세요.
        </p>
      )}
    </section>
  );
}

function AchievementList({
  achievements,
}: {
  achievements: AchievementType[];
}) {
  return (
    <ul className="flex flex-col">
      {achievements &&
        achievements.map((achievement) => {
          return (
            <AchievementItem key={achievement.id} achievement={achievement} />
          );
        })}
    </ul>
  );
}

function AchievementItem({ achievement }: { achievement: AchievementType }) {
  return (
    <li className="vh-center flex-col mb-4 py-4 px-6 text-center bg-gray-light text-text-dark border-gray-dark border-double border-4 border-r-0 border-l-0">
      <p className="text-xl mb-2">{achievement.title}</p>
      <p className="mb-2 italic">{achievement.description}</p>
      <p className="max-w-xs mb-2 text-sm">{achievement.condition}</p>
    </li>
  );
}
