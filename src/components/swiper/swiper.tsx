import { useCallback, useRef } from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Icon from '@/components/icon';

interface Props {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  withArrow?: boolean;
  scroll?: number;
}

const Container = tw.div`
  no-scrollbar flex overflow-x-scroll scroll-smooth py-5
`;

const Inner = tw.div`
  mr-[25px] flex flex-nowrap gap-x-[25px] md:mr-0
`;

export default function Swiper({
  className,
  innerClassName,
  children,
  withArrow = false,
  scroll = 200,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scroll;
    }
  }, [scroll]);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scroll;
    }
  }, [scroll]);

  return (
    <div className='md:flex md:flex-row md:items-center'>
      {withArrow && (
        <Icon
          variant='angle-left'
          width={24}
          className='mr-3 hidden cursor-pointer md:block'
          onClick={scrollLeft}
        />
      )}

      <Container
        className={cn(className)}
        data-testid='test-element'
        ref={scrollContainerRef}
      >
        <Inner className={cn(innerClassName)}>{children}</Inner>
      </Container>

      {withArrow && (
        <Icon
          variant='angle-right'
          width={24}
          className='ml-3 hidden cursor-pointer md:block'
          onClick={scrollRight}
        />
      )}
    </div>
  );
}
