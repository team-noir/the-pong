import { AchievementType } from 'types';

interface Props {
  achievement: AchievementType;
}

export default function AchievementItem({ achievement }: Props) {
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
