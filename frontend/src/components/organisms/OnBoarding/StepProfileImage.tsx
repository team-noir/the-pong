import { FormData } from 'components/organisms/OnBoarding';
import FileInputWithImage from 'components/molecule/FileInputWithImage';

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const defaultImage = `${process.env.PUBLIC_URL}/images/default-profile-image.png`;

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
      <h2 className="section-title">프로필 이미지를 설정해 주세요.</h2>
      <div className="my-16">
        <FileInputWithImage
          imageUrl={defaultImage}
          onChange={handleChange}
          onClickRemove={handleClickRemove}
        />
      </div>
    </div>
  );
}
