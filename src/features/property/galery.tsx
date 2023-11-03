import { useState } from 'react';
import tw from 'tailwind-styled-components';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

import { cn } from '@/lib/utils';

import Image from '@/components/image';

const Grid = tw.div`
  md:grid md:grid-cols-2 md:gap-3
`;

type Photo = {
  src: string;
  width: number;
  height: number;
};

export default function Galery({
  className,
  photos,
}: {
  className?: string;
  photos: Photo[];
}) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <Grid className={cn(className)} data-testid='test-element'>
        <div className=''>
          <Image
            alt='...'
            src={photos[0].src}
            width={980}
            height={551}
            className='h-full w-full cursor-pointer object-cover'
            onClick={() => setIndex(0)}
          />
        </div>

        <Grid className='hidden'>
          {photos.slice(1, 5).map((image, i) => (
            <Image
              key={`header-image-${i}`}
              alt='...'
              src={image.src}
              width={image.width}
              height={image.height}
              className='h-full w-full cursor-pointer object-cover'
              onClick={() => setIndex(i + 1)}
            />
          ))}
        </Grid>
      </Grid>

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[]}
      />
    </>
  );
}
