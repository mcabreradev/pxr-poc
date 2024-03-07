import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import Typography from '@/components/typography';

type Rule = {
  name: string;
  description: string;
};

type Props = {
  rules: Rule[];
  classname?: string;
};

export default function HotelRules({ rules, classname }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h2' weight='normal'>
        {t('title.hotel-rules')}
      </Typography>

      <div className={cn('my-4', classname)}>
        {rules.map((rule, key) => (
          <div key={`$rules-${key}`} className='flex justify-between py-2'>
            <Typography>{rule.name}</Typography>
            <Typography weight='light'>{rule.description}</Typography>
          </div>
        ))}
      </div>

      <Typography weight='semibold' className='underline'>
        {t('info.show-more')}
      </Typography>
    </>
  );
}
