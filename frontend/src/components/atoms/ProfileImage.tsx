import styles from 'assets/styles/ProfileImage.module.css';

interface Props {
  profileImageUrl: string | undefined;
  alt: string;
  size: number;
}

export default function ProfileImage({ profileImageUrl, alt, size }: Props) {
  return (
    <img
      src={profileImageUrl || 'https://placekitten.com/800/800'}
      alt={alt}
      width={size}
      height={size}
      className={styles.img}
    />
  );
}
