import { Drawer } from '@material-tailwind/react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn, uuid } from '@/lib/utils';

import { Icon } from '@/components';
import Typography from '@/components/typography';

const Container = tw.div`
  absolute-container
`;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setOpen(true);
    if (containerRef.current) {
      (containerRef.current as HTMLDivElement).scrollTop = 0;
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
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

      <Typography weight='semibold' className='underline' onClick={openDrawer}>
        {t('info.show-more')}
      </Typography>

      <Drawer
        size={9000}
        placement='bottom'
        open={open}
        onClose={closeDrawer}
        className='p-4'
        transition={{ duration: 0.5 }}
      >
        <Container>
          <div className='my-4 ml-4 flex justify-start'>
            <Icon
              variant='outline-chevron-left'
              onClick={closeDrawer}
              width={25}
              height={25}
            />
          </div>

          <div className='overflow-auto px-6' ref={containerRef} id={uuid()}>
            <Typography variant='h1' weight='semibold'>
              {t('title.hotel-rules')}
            </Typography>

            <div className={cn('my-5', classname)}>
              {rules.map((rule, key) => (
                <div
                  key={`$rules-${key}`}
                  className='flex justify-between py-3'
                >
                  <Typography variant='base'>{rule.name}</Typography>
                  <Typography variant='base' weight='light'>
                    {rule.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Drawer>
    </div>
  );
}
