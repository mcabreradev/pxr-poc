/* eslint-disable simple-import-sort/imports */
import { Drawer } from '@material-tailwind/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

import { useIntersectionObserver, useQueryString } from '@/hooks';
import { getSlides } from '@/lib/images';
import { cn, uuid } from '@/lib/utils';

import Icon from '@/components/icon';

import { useGlobalStore } from '@/store';

import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  ESCAPE,
  GALERY,
  IMG,
} from '@/constants';

const Container = tw.div`
  absolute-container
`;

export default function Gallery({
  className,
  photos,
}: {
  className?: string;
  photos;
}) {
  const [index, setIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const { updateQueryString, removeQueryString } = useQueryString();
  const showDrawer = searchParams.get(GALERY);
  const { setGalleryIntersecting } = useGlobalStore();

  const { ref, entry } = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: '200px',
  });

  const handleScrollTop = useCallback(() => {
    if (containerRef.current) {
      (containerRef.current as HTMLDivElement).scrollTop = 0;
    }
  }, []);

  const openDrawer = useCallback(() => {
    setOpen(true);
    handleScrollTop();
    updateQueryString({ [GALERY]: true });
  }, [handleScrollTop, updateQueryString]);

  const openLightbox = useCallback(
    (index) => {
      updateQueryString({ [IMG]: index });
      setIndex(index);
    },
    [updateQueryString],
  );

  const closeDrawer = useCallback(() => {
    setOpen(false);
    removeQueryString(GALERY);
  }, [removeQueryString]);

  const closeLightbox = useCallback(() => {
    setIndex(-1);
    updateQueryString({ [GALERY]: -1 });
    removeQueryString(IMG);
  }, [removeQueryString, updateQueryString]);

  useEffect(() => {
    if (showDrawer) {
      openDrawer();
    }
  }, [openDrawer, showDrawer]);

  useEffect(() => {
    if (index >= 0) {
      updateQueryString({ [IMG]: index });
    }
  }, [index, updateQueryString]);

  useEffect(() => {
    if (index !== -1 || !showDrawer) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ESCAPE) {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeDrawer, showDrawer, index]);

  useEffect(() => {
    if (entry && 'isIntersecting' in entry) {
      setGalleryIntersecting(entry.isIntersecting);
    }
  }, [entry, setGalleryIntersecting]);

  const memoizedSlides = useMemo(() => getSlides(photos), [photos]);

  return (
    <div>
      <div
        className={cn('h-[295px] gap-3 md:grid md:grid-cols-2', className)}
        data-testid='test-calendar-element'
        ref={ref}
      >
        <Image
          alt='...'
          src={photos[0].url ?? ''}
          width={Number(photos[0].width) ?? DEFAULT_WIDTH}
          height={Number(photos[0].height) ?? DEFAULT_HEIGHT}
          className='opacity-effect h-full w-full cursor-pointer object-cover'
          onClick={openDrawer}
        />

        <div className='hidden gap-3 md:grid md:grid-cols-2'>
          {photos.slice(1, photos.length).map((photo, i) => (
            <Image
              key={`header-photo-${i}`}
              alt='...'
              src={photo.url ?? ''}
              width={DEFAULT_WIDTH}
              height={DEFAULT_HEIGHT}
              className='opacity-effect d-block mx-auto h-[147px] w-full cursor-pointer object-cover'
              onClick={openDrawer}
            />
          ))}
        </div>
      </div>

      <Drawer
        size={9000}
        placement='bottom'
        open={open}
        onClose={closeDrawer}
        className='p-4'
        transition={{ duration: 0.5 }}
        dismiss={{ escapeKey: false }}
      >
        <Container>
          <div className='my-4 ml-4 flex justify-start'>
            <Icon
              variant='outline-chevron-left'
              onClick={closeDrawer}
              width={25}
              height={25}
            />
          </div>

          <div className=' overflow-auto pb-14' ref={containerRef} id={uuid()}>
            <div className='md:layout2 mx-auto grid grid-cols-2 gap-2 md:gap-3'>
              {photos.map((image, i) => (
                <div
                  key={`galery-image-${i}`}
                  className={cn(
                    i % 3 === 0 ? 'col-span-2' : '',
                    'opacity-effect',
                  )}
                >
                  <Image
                    alt='...'
                    src={image.url}
                    width={Number(image.width) ?? DEFAULT_WIDTH}
                    height={Number(image.height) ?? DEFAULT_HEIGHT}
                    className=' h-full w-full cursor-pointer object-cover'
                    onClick={() => openLightbox(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Lightbox
            slides={memoizedSlides}
            open={index >= 0}
            index={index}
            close={closeLightbox}
            plugins={[]}
            noScroll={{ disabled: true }}
            on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
          />
        </Container>
      </Drawer>
    </div>
  );
}
