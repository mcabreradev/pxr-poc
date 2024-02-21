/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useQueryString } from '@/hooks';

import { Radio, Typography } from '@/components';
import { PLAN, PLAN_NONREFUNDABLE, PLAN_REFUNDABLE } from '@/constants';
import { formatCurrency } from '@/lib/number';
import { cn } from '@/lib/utils';

type Props = {
  plan: string | null | undefined;
  ratesPlan: string[] | unknown[] | null | undefined;
  onChange: (event: unknown) => void;
  cancelCost: number;
};

export default function CancelationPoliceComponent({
  plan,
  onChange,
  cancelCost,
  ratesPlan,
}: Props) {
  const { t } = useTranslation();

  const [selectedPlan, setSelectedPlan] = useState(plan);
  const { updateQueryString } = useQueryString();

  const isRefundable = (selectedPlan || plan) === PLAN_REFUNDABLE;
  const isNonRefundable =
    (selectedPlan || plan) === PLAN_NONREFUNDABLE || !plan;

  const handlePlanChange = useCallback(
    (event) => {
      onChange(event.target.value);
      setSelectedPlan(event.target.value);
    },
    [onChange],
  );

  useEffect(() => {
    if (!selectedPlan) return;
    updateQueryString({ [PLAN]: selectedPlan });
    onChange(plan ?? selectedPlan);
    setSelectedPlan(plan ?? selectedPlan);
  }, [onChange, plan, selectedPlan, updateQueryString]);

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
        <Typography variant='sm' className='mb-1 text-neutral-500'>
          {t('info.non-refundable')}
        </Typography>
      </div>

      {false && (
        <>
          <div className='flex flex-wrap justify-between py-1'>
            <Radio
              label={t('info.non-refundable')}
              name='cancellation-policy'
              value={PLAN_NONREFUNDABLE}
              checked={isNonRefundable}
              onChange={handlePlanChange}
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
              + {formatCurrency(cancelCost)}
            </Typography>
          </div>{' '}
        </>
      )}
    </Fragment>
  );
}
