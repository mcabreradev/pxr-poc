import { Drawer } from '@material-tailwind/react';
import { useCallback } from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

type Props = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  icon?: string;
  size?: number;
  open: boolean | undefined;
  onClose: () => void;
};

const Container = tw.div`
  absolute-container px-4
`;

export default function DrawerComponent({
  className,
  children,
  title,
  open = false,
  onClose,
  size,
  icon,
}: Props) {
  const closeDrawer = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Drawer
      size={size || window.innerHeight}
      placement='bottom'
      open={open}
      onClose={closeDrawer}
      className={cn('bg-white-100 p-0', className)}
      transition={{ duration: 0.5 }}
    >
      <Container data-testid='test-element'>
        <div className='ml-2 mt-4 flex justify-start'>
          <Icon
            variant={icon ?? 'outline-chevron-left'}
            onClick={closeDrawer}
            width={25}
            height={25}
          />
        </div>
        {title && (
          <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
            <Typography variant='base' className='underline'>
              {title}
            </Typography>
          </div>
        )}
        {children}
      </Container>
    </Drawer>
  );
}
