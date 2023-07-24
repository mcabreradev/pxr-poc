import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

const Container = tw.div`
  no-scrollbar flex overflow-x-scroll scroll-smooth py-5
`;

const Inner = tw.div`
  flex flex-nowrap gap-x-[30px]
`;

export default function Swiper({ className, innerClassName, children }: Props) {
  return (
    <Container className={cn(className)} data-testid='test-element'>
      <Inner className={cn(innerClassName)}>{children}</Inner>
    </Container>
  );
}
