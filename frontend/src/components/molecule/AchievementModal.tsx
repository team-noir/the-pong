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
      <div className="flex vh-center min-w-[24em] min-h-[12em]">
        <div className="text-center">
          <h3 className="text-2xl mb-2">{achievement.title}</h3>
          <p>{achievement.description}</p>
        </div>
      </div>
    </Modal>
  );
}
