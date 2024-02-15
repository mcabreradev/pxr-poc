import { cn } from '@/lib/utils';

import Typography from '@/components/typography';

type Props = {
  leftMainText: string;
  leftMainTag?: string;
  leftSecondaryText?: string | null;
  leftSecondaryTag?: string;
  rightMainText: string;
  rightMainTag?: string;
  rightSecondaryText?: string | null;
  rightSecondaryTag?: string;
  className?: string;
};

export default function SummaryRow({
  leftMainText,
  leftMainTag = 'div',
  leftSecondaryText = null,
  leftSecondaryTag = 'div',
  rightMainText,
  rightMainTag = 'div',
  rightSecondaryText = null,
  rightSecondaryTag = 'div',
  className = '',
}: Props) {
  return (
    <div className={cn('mx-6 mt-3 flex', className)}>
      <div className='basis-2/3'>
        <Typography variant='sm' weight='normal' tag={leftMainTag}>
          {leftMainText}
        </Typography>
        {leftSecondaryText ? (
          <Typography variant='xs' className='pr-4' tag={leftSecondaryTag}>
            {leftSecondaryText}
          </Typography>
        ) : null}
      </div>
      <Typography
        variant='sm'
        tag={rightMainTag}
        className='basis-1/3 text-right'
      >
        {rightMainText}
      </Typography>
      {rightSecondaryText ? (
        <Typography variant='xs' className='pr-4' tag={rightSecondaryTag}>
          {rightSecondaryText}
        </Typography>
      ) : null}
    </div>
  );
}
