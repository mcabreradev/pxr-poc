import React, { useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

const Container = tw.div`
  z-20
  w-full
  border-t-[0.5px]
  border-solid
  border-neutral-100
`;

export default function StickyComponent({
  children,
  className,
  scrollTop = false,
  scrollBottom = false,
  until = 0,
}: {
  children: React.ReactNode;
  className?: string;
  scrollTop?: boolean;
  scrollBottom?: boolean;
  until?: number;
}) {
  const [stickyClass, setStickyClass] = useState('');
  const ANIMATION_UP = 'fixed bottom-0 animate-fade-up animate-normal';
  const ANIMATION_DOWN = 'animate-fade-up animate-reverse';

  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop && scrollPosition <= until) {
      setStickyClass(ANIMATION_DOWN);
    } else if (scrollTop && scrollPosition > until) {
      setStickyClass(ANIMATION_UP);
    }

    if (scrollBottom && scrollPosition <= until) {
      setStickyClass(ANIMATION_UP);
    } else if (scrollBottom && scrollPosition > until) {
      setStickyClass(ANIMATION_DOWN);
    }
  }, [scrollTop, scrollBottom, until]);

  useEffect(() => {
    if (scrollBottom) {
      setStickyClass(ANIMATION_UP);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, scrollBottom]);

  return (
    <Container
      data-testid='test-sticky-element'
      className={cn(stickyClass, className)}
    >
      {children}
    </Container>
  );
}
