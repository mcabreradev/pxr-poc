import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { formatCurrency } from '@/lib/number';
import { cn } from '@/lib/utils';

import { Button, Image, Typography } from '@/components';

type Props = {
  id: string | number;
  name: string;
  description: string;
  maxCapacity: number;
  standardCapacity: number;
  rate: number;
  image: string;
  className?: string;
  onClick: () => void;
};

const Card = tw.div``;

export default function CardComponent({
  id,
  name,
  description,
  maxCapacity,
  standardCapacity,
  rate,
  className,
  onClick,
  image,
}: Props) {
  const { t } = useTranslation();

  return (
    <Card
      className={cn(
        'box-border h-auto w-[271px] border-[1px] border-solid border-gray-50 bg-white shadow',
        className,
      )}
      data-testid='test-card-element'
      data-id={id}
    >
      <div className='h-[180px] w-full overflow-hidden'>
        <Image
          alt={name}
          src={image}
          width={269}
          height={180}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='p-4'>
        <Typography variant='h3' weight='medium' className='pb-4'>
          {name ?? t('title.room')}
        </Typography>
        <Typography className='pb-1'>
          {`Max ${maxCapacity} ${t('person.plural')}`}
        </Typography>
        <Typography className='pb-4'>{description}</Typography>

        <Typography
          weight='medium'
          className='pb-6 underline'
          onClick={onClick}
        >
          {standardCapacity} {t('person.plural')}
        </Typography>

        <Typography className='pb-5' variant='base'>
          <>
            {t('from')} <b>{formatCurrency(rate)}</b> {t('night.singular')}
          </>
        </Typography>

        <Button type='button' className='mb-4 w-full' onClick={onClick}>
          {t('button.reserve')}
        </Button>
      </div>
    </Card>
  );
}
