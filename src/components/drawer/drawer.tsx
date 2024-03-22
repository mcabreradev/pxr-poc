import { useCallback } from 'react';
import Drawer from 'react-modern-drawer';

import 'react-modern-drawer/dist/index.css';

import { cn } from '@/lib/utils';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

type Props = {
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  icon?: string;
  size?: number;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  open: boolean | undefined;
  onClose: () => void;
};

export default function DrawerComponent({
  className,
  children,
  footer,
  title,
  open = false,
  placement = 'bottom',
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
      direction={placement}
      open={open}
      onClose={closeDrawer}
      className={cn('bg-white-100 p-0', className)}
      duration={350}
    >
      <div
        className='absolute-container flex flex-col px-4'
        data-testid='test-element'
      >
        <section>
          <div className='my-4 ml-2 flex justify-start'>
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
        </section>

        <div className='flex-grow'>{children}</div>

        <section>{footer ?? footer}</section>
      </div>
    </Drawer>
  );
}
