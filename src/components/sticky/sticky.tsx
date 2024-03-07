import { motion } from 'framer-motion';
import React from 'react';
import tw from 'tailwind-styled-components';

const Container = tw(motion.div)`
  bottom-0
  z-20
  w-full
  border-t-[0.5px]
  border-solid
  border-neutral-100
  fixed
`;

export default function StickyComponent({
  children,
  className,
  show = true,
}: {
  children: React.ReactNode;
  className?: string;
  show: boolean;
}) {
  const variants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: '0%' },
  };

  return (
    <Container
      data-testid='test-sticky-element'
      className={className}
      initial='visible'
      animate={show ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      variants={variants}
    >
      {children}
    </Container>
  );
}
