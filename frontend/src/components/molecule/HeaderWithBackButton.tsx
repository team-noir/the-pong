import { useNavigate } from 'react-router-dom';
import Button from 'components/atoms/Button';
import { ReactElement } from 'react';

interface Props {
  title?: string;
  button?: ReactElement;
}

export default function HeaderWithBackButton({ title, button }: Props) {
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
      {button}
    </>
  );
}
