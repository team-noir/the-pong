import { API_PREFIX } from 'api/api.v1';
import styles from 'assets/styles/ProfileImage.module.css';

interface Props {
  userId: number | undefined;
  alt: string;
  size: number;
}

export default function ProfileImage({ userId, alt, size }: Props) {
  return (
    <img
      src={
        userId !== undefined
          ? `${API_PREFIX}/users/${userId}/profile-image`
          : 'https://placekitten.com/800/800'
      }
      alt={alt}
      width={size}
      height={size}
      className={styles.img}
    />
  );
}
