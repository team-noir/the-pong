import { API_PREFIX } from 'api/api.v1';
import { DEFAULT_PROFILE_IMAGE } from 'constants/index';

interface Props {
  userId: number;
  nickname: string;
  size: number;
}

export default function ProfileImage({ userId, nickname, size }: Props) {
  const style = {
    width: size,
    height: size,
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = DEFAULT_PROFILE_IMAGE;
  };

  return (
    <img
      src={`${API_PREFIX}/users/${userId}/profile-image`}
      className="rounded-full object-cover"
      alt={`${nickname}의 프로필 이미지`}
      width={size}
      style={style}
      onError={handleImgError}
    />
  );
}
