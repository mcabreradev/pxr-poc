import { useTranslation } from 'react-i18next';

import Typography from '@/components/typography';

import { PLAN_REFUNDABLE } from '@/constants';
import SummaryRow from '@/features/summary/summaryRow';

type Props = {
  plan: string | void;
};

export default function Cancellation({ plan }: Props) {
  const { t } = useTranslation();

  const isRefundable = plan === PLAN_REFUNDABLE;

  return (
    <section>
      <Typography variant='h2' weight='normal' className='px-4'>
        {t('info.cancellation-policy')}
      </Typography>
      {isRefundable ? (
        <>
          <Typography variant='sm' weight='normal' className='px-4'>
            {`${t('info.refundable')} - ${t('info.free-cancellation-berfore')}`}
          </Typography>
          <Typography variant='sm' weight='normal' tag='a' className='px-4'>
            {t('summary.cancel-reservation')}
          </Typography>
        </>
      ) : (
        <SummaryRow
          leftMainText={t('info.non-refundable')}
          rightMainText={t('summary.cancel-reservation')}
          rightMainTag='a'
        />
      )}
    </section>
  );
}
