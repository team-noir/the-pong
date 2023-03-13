import ProfileImage from 'components/atoms/ProfileImage';
import styles from 'assets/styles/ProfileImageWithStatus.module.css';

interface Props {
  profileImageUrl: string | undefined;
  alt: string;
  size: number;
  status: 'on' | 'off' | 'game';
}

export default function ProfileImageWithStatus({
  profileImageUrl,
  alt,
  size,
  status,
}: Props) {
  return (
    <div className={styles.container} style={{ width: size }}>
      <ProfileImage profileImageUrl={profileImageUrl} alt={alt} size={size} />
      {status !== 'off' && (
        <div className={styles.status}>{status === 'on' ? '🟢' : 'Game'}</div>
      )}
    </div>
  );
}
