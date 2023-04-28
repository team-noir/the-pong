import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Logo from 'components/atoms/Logo';

interface Props {
  title?: string;
  noTitle?: boolean;
  hasBackButton?: boolean;
  onClick?: () => void;
  button?: ReactNode;
}

export default function Header({
  title,
  noTitle = false,
  hasBackButton = false,
  onClick,
  button,
}: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick ? onClick() : navigate(-1);
  };

  return (
    <div className="container mx-auto max-w-xl fixed top-0 left-0 right-0 backdrop-blur-md">
      <div className="mx-auto max-w-xl px-2">
        <div className="relative flex h-14 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center">
            {hasBackButton && (
              <div className="inline-flex vh-center rounded p-2 text-gray hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                <ChevronLeftIcon
                  className="w-6 h-6"
                  role="button"
                  onClick={onClick || handleClick}
                />
              </div>
            )}
          </div>
          <div className="vh-center flex-1">
            {!noTitle && (
              <h1 className="text-xl font-normal text-stone-100">
                {title ? title : <Logo />}
              </h1>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <div className="inline-flex vh-center rounded p-2 text-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {button}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
