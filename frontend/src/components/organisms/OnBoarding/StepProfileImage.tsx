import FileInputWithImage from 'components/molecule/FileInputWithImage';
import { FormData } from 'components/organisms/OnBoarding';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// TODO: 나중에 default image 파일 경로로 수정
const defaultImage = 'https://placekitten.com/800/800';

export default function StepProfileImage({ setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setFormData((prevState) => ({
      ...prevState,
      imageFile: files[0],
    }));
  };

  const handleClickRemove = () => {
    setFormData((prevState) => ({
      ...prevState,
      imageFile: null,
    }));
  };

  return (
    <div>
      <h2>프로필 이미지를 설정해 주세요.</h2>
      <div>
        <FileInputWithImage
          imageUrl={defaultImage}
          onChange={handleChange}
          onClickRemove={handleClickRemove}
        />
      </div>
    </div>
  );
}
