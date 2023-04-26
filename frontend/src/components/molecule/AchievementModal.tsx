import Modal from 'components/templates/Modal';
import { AchievementType } from 'types';

export default function AchievementModal({
  achievement,
  onClickClose,
}: {
  achievement: AchievementType;
  onClickClose: () => void;
}) {
  return (
    <Modal onClickClose={onClickClose} fitContent title="업적을 획득했습니다.">
      <div className="vh-center flex-col text-center">
        <div>
          <p className="text-xlg mb-2">{achievement.title}</p>
        </div>
        <div className="max-w-xs mb-1">
          <p>{achievement.condition}</p>
        </div>
        <div className="max-w-xs">
          <p className="italic">{achievement.description}</p>
        </div>
      </div>
    </Modal>
  );
}
