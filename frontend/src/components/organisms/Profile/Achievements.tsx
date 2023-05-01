import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAchievements } from 'api/api.v1';
import { AchievementType } from 'types';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  userId: number;
}

export default function Achievements({ userId }: Props) {
  const { data: achievements, isSuccess } = useQuery<
    AchievementType[],
    AxiosError
  >({
    queryKey: [QUERY_KEYS.ACHIEVEMENTS, String(userId)],
    queryFn: () => getAchievements(userId),
    useErrorBoundary: (error: AxiosError) => {
      if (error && error.response?.status === 404) return false;
      return true;
    },
  });

  return (
    <section className="section">
      <h2 className="section-title">업적</h2>
      {isSuccess && achievements.length > 0 ? (
        <AchievementList achievements={achievements} />
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
      <div>
        <p className="text-lg mb-2">{achievement.title}</p>
      </div>
      <div className="max-w-xs mb-1">
        <p className="text-sm">{achievement.condition}</p>
      </div>
      <div className="max-w-xs">
        <p className="text-sm italic">{achievement.description}</p>
      </div>
    </li>
  );
}
