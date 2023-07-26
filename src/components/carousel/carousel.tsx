import { Carousel as CarouselComponent } from '@material-tailwind/react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = tw.div`
  flex
`;
export default function Carousel({ className, children }: Props) {
  return (
    <Container className={cn(className)} data-testid='test-element'>
      <CarouselComponent navigation={() => null} loop={true}>
        {children}
      </CarouselComponent>
    </Container>
  );
}
