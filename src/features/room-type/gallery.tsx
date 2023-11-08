import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const Container = tw.div``;

export default function GalleryComponent({ className }: Props) {
  return (
    <Container className={cn(className)} data-testid='test-element'>
      Hi I'm Gallery Component
    </Container>
  );
}
