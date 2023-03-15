import { useState, useRef } from 'react';
import Button from 'components/atoms/Button';
import styles from 'assets/styles/FileInputWithImage.module.css';

interface Props {
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRemove: () => void;
}

export default function FileInputWithImage({
  imageUrl,
  onChange,
  onClickRemove,
}: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    onChange(e);
    setImagePreviewUrl(URL.createObjectURL(files[0]));
  };

  const handleClickFileUpload = () => {
    fileInput.current?.click();
  };

  const handleClickFileRemove = () => {
    URL.revokeObjectURL(imagePreviewUrl);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    onClickRemove();
    setImagePreviewUrl('');
  };

  return (
    <>
      <img
        src={imagePreviewUrl || imageUrl}
        alt="profile image"
        className={styles.img}
      />
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleFileChange}
          className={styles.input}
        />
        <Button type="button" onClick={handleClickFileUpload}>
          이미지 업로드하기
        </Button>
        <Button type="button" onClick={handleClickFileRemove}>
          이미지 삭제하기
        </Button>
      </div>
    </>
  );
}
