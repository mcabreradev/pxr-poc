import { Drawer } from '@material-tailwind/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { createQueryString, removeQueryStringParam } from '@/lib/url';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { TOPSIGHT } from '@/constant';

type Props = {
  className?: string;
  topSights: Array<{ [key: string]: string }>;
};

const Container = tw.div`
  absolute-container
`;

export default function PropertyTopSights({ className, topSights }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showDrawer = searchParams.get(TOPSIGHT);

  const openDrawer = useCallback(() => {
    setOpen(true);
    if (containerRef.current) {
      (containerRef.current as HTMLDivElement).scrollTop = 0;
    }
    router.push(
      `${pathname}?${createQueryString(searchParams, TOPSIGHT, '1')}`,
    );
  }, [pathname, router, searchParams]);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    router.push(
      `${pathname}?${removeQueryStringParam(searchParams, TOPSIGHT)}`,
    );
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (showDrawer) {
      openDrawer();
    }
  }, [openDrawer, showDrawer]);

  return (
    <div className={cn(className)} data-testid='test-element'>
      <Button
        className='w-full font-semibold'
        variant='secondary'
        onClick={openDrawer}
      >
        {t('button.all-atractions')}
      </Button>

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

          <div className='overflow-auto px-6' ref={containerRef}>
            <Typography variant='h1' weight='semibold'>
              {t('title.attractions')}
            </Typography>

            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='camera' width={24} />
              <Typography variant='base' className='underline'>
                {t('title.activities')}
              </Typography>
            </div>

            {topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}

            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='restaurant' width={24} />
              <Typography variant='base' className='underline'>
                {t('Restaurantes')}
              </Typography>
            </div>

            {topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}

            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='museum' width={24} />
              <Typography variant='base' className='underline'>
                {t('Museos')}
              </Typography>
            </div>

            {topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}

            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='subway' width={24} />
              <Typography variant='base' className='underline'>
                {t('Transporte')}
              </Typography>
            </div>

            {topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </Drawer>
    </div>
  );
}
