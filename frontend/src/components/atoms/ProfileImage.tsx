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
    <img
      src={
        userId !== undefined
          ? `${API_PREFIX}/users/${userId}/profile-image`
          : `${process.env.PUBLIC_URL}/images/default-profile-image.png`
      }
      className="rounded-full object-cover"
      alt={alt}
      width={size}
      style={style}
    />
  );
}
