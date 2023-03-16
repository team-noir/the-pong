import { useNavigate } from 'react-router-dom';
import Button from 'components/atoms/Button';

interface Props {
  title?: string;
}

export default function HeaderWithBackButton({ title }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Button type="button" onClick={handleClick}>
        &lt;
      </Button>
      {title && <h1>{title}</h1>}
    </>
  );
}
