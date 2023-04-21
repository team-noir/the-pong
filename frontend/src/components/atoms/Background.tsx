import { useState } from 'react';
import { classNames } from 'utils';

// NOTE: The parent element of this component should have position: relative

export default function Background({ imageSrc }: { imageSrc?: string }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className={classNames(
        'absolute top-0 left-0 w-full h-full select-none bg-cover bg-center bg-no-repeat transition-opacity duration-[3000ms] opacity-0',
        isImageLoaded && 'opacity-100'
      )}
      style={{
        backgroundImage: isImageLoaded ? `url(${imageSrc})` : '',
      }}
    >
      <img src={imageSrc} className="hidden" onLoad={handleOnLoad} />
    </div>
  );
}
