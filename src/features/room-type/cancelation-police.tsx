import { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatCurrency } from '@/lib/number';
import { cn } from '@/lib/utils';

import Radio from '@/components/radio';
import Typography from '@/components/typography';

import { PLAN_NONREFUNDABLE, PLAN_REFUNDABLE } from '@/constants';

type Props = {
  plan: string;
  onChange: (event: unknown) => void;
};

export default function CancelationPoliceComponent({ plan, onChange }: Props) {
  const { t } = useTranslation();

  const [selectedPlan, setSelectedPlan] = useState(plan);

  const isRefundable = selectedPlan === PLAN_REFUNDABLE;
  const isNonRefundable = selectedPlan === PLAN_NONREFUNDABLE;

  const handlePlanChange = useCallback(
    (event) => {
      onChange(event);
      setSelectedPlan(event.target.value);
    },
    [onChange],
  );

  return (
    <Fragment>
      <div className='flex flex-wrap justify-between pb-0 pt-2'>
        <div>
          <Typography
            variant='sm'
            weight='semibold'
            className='text-neutral-400'
          >
            {t('info.cancellation-policy')}
          </Typography>
        </div>
      </div>

      <div className='flex flex-wrap justify-between py-1'>
        <Radio
          label={t('info.non-refundable')}
          name='cancellation-policy'
          value={PLAN_NONREFUNDABLE}
          checked={isNonRefundable}
          onChange={handlePlanChange}
          defaultChecked
        />
        <Typography
          variant='sm'
          className={cn('text-neutral-500', {
            'text-gray-500': !isNonRefundable,
          })}
        >
          + {formatCurrency(0.0)}
        </Typography>
      </div>

      <div className='flex flex-wrap justify-between py-1'>
        <Radio
          label={t('info.refundable')}
          subtitle={t('info.free-cancellation-before')}
          name='cancellation-policy'
          value={PLAN_REFUNDABLE}
          checked={isRefundable}
          onChange={handlePlanChange}
        />
        <Typography
          variant='sm'
          className={cn('text-neutral-500', {
            'text-gray-500': !isRefundable,
          })}
        >
          + {formatCurrency(0.0)}
        </Typography>
      </div>
    </Fragment>
  );
}
