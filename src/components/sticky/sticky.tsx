import React, { useEffect, useState } from 'react';
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
  scrollTop = 0,
}: {
  children: React.ReactNode;
  className?: string;
  scrollTop?: number;
}) {
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition > scrollTop) {
        setStickyClass(`
        fixed bottom-0 animate-fade-up animate-normal
        `);
      } else {
        setStickyClass(`
        animate-fade-up animate-reverse
        `);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTop]);

  return (
    <Container
      data-testid='test-element'
      className={cn(stickyClass, className)}
    >
      {children}
    </Container>
  );
}
