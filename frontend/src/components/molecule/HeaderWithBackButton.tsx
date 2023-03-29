import { useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface Props {
  title?: string;
  button?: ReactElement | boolean;
}

export default function HeaderWithBackButton({ title, button }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="mx-auto max-w-xl px-2 ">
        <div className="relative flex h-14 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <div className="inline-flex items-center justify-center rounded-md p-2 text-stone-100 hover:bg-gray-700 hover:text-stone-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
              <ChevronLeftIcon
                className="w-6 h-6"
                role="button"
                onClick={handleClick}
              />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            {title && (
              <h1 className="text-xl font-normal text-stone-100">{title}</h1>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {button}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
