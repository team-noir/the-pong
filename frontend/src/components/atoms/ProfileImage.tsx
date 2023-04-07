import { API_PREFIX } from 'api/api.v1';

interface Props {
  userId: number | undefined;
  alt: string;
  size: number;
}

export default function ProfileImage({ userId, alt, size }: Props) {
  const style = {
    width: size,
    height: size,
  };
  return (
    <div className={`image-wrapper rounded-full overflow-hidden`} style={style}>
      <img
        src={
          userId !== undefined
            ? `${API_PREFIX}/users/${userId}/profile-image`
            : 'https://placekitten.com/800/800'
        }
        alt={alt}
        width={size}
      />
    </div>
  );
}
