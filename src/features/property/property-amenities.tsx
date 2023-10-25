import { Drawer } from '@material-tailwind/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { createQueryString, removeQueryStringParam } from '@/lib/url';
import { cn, uuid } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { AMENITIES } from '@/constant';

type Props = {
  className?: string;
  amenities: Array<{ [key: string]: string }>;
};

const Container = tw.div`
  absolute-container
`;

export default function PropertyAmenities({ className, amenities }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showDrawer = searchParams.get(AMENITIES);

  const openDrawer = useCallback(() => {
    setOpen(true);
    if (containerRef.current) {
      (containerRef.current as HTMLDivElement).scrollTop = 0;
    }
    router.replace(
      `${pathname}?${createQueryString(searchParams, AMENITIES, '1')}`,
      { scroll: false },
    );
  }, [pathname, router, searchParams]);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    router.replace(
      `${pathname}?${removeQueryStringParam(searchParams, AMENITIES)}`,
      { scroll: false },
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
        className='font-semibold'
        variant='secondary'
        onClick={openDrawer}
      >
        {t('button.all-amemnities')}
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

          <div className='overflow-auto px-6' ref={containerRef} id={uuid()}>
            <Typography variant='h1' weight='semibold'>
              {t('¿Qué ofrece este lugar?')}
            </Typography>

            <div className='flex flex-wrap justify-between py-4'>
              {amenities.map((service, i) => (
                <div
                  key={`service-drawer-${service.icon}-${i}`}
                  className='flex w-full flex-row gap-2 border-b-[1px] border-solid border-white-200 py-6'
                >
                  <Icon variant={service.icon} width='18px' color='#949494' />
                  <p className='pl-[5px] text-2sm'>{service.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Drawer>
    </div>
  );
}
