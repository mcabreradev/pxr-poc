/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useEventBus from '@/hooks/use-event-bus';
import useHostUrl from '@/hooks/use-hosturl';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { CHECKUSER } from '@/constants';
import SocialSignOn from '@/features/guest-details/social-sign-on';
import { authSchema } from '@/schemas';
import { useCallback, useEffect } from 'react';

interface IForm {
  email: string;
}

type Props = {
  className?: string;
  roomtype: string;
};

const Container = tw.div`
`;

export default function FormAuthComponent({ className, roomtype }: Props) {
  const { t } = useTranslation();

  const { urlStatus } = useHostUrl();
  const { getEventData, subscribe, publish } = useEventBus();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(authSchema(t)),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    publish({
      eventType: CHECKUSER,
      data,
    });
  };

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType || eventType !== CHECKUSER) return;

      if (data.err) {
        setError('email', {
          type: 'manual',
          message: data.err,
        });
      }
    },
    [setError],
  );

  useEffect(() => {
    subscribe(handlerEvent);
    getEventData(urlStatus);
  }, [getEventData, handlerEvent, subscribe, urlStatus]);

  return (
    <Container className={cn(className)} data-testid='test-element'>
      <Typography variant='h2' weight='normal'>
        {t('title.register')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col flex-wrap justify-between gap-4 py-3 pt-8'>
          <Typography variant='sm' weight='semibold' className='' tag='label'>
            {t('form.email.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('email')}
              type='email'
              placeholder={t('form.email.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.email,
                },
              )}
            />

            <span
              className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
                block: errors.email,
              })}
            >
              <Icon
                variant='exclamation'
                width={12}
                height={12}
                color='#f79009'
              />
            </span>
          </div>

          <span className='text-warning-600'>
            {errors.email && errors.email.message}
          </span>
        </div>
        <Button
          className='mt-3 font-semibold md:w-full'
          variant='primary'
          type='submit'
        >
          {t('button.continue')}
        </Button>
      </form>

      <hr />

      <SocialSignOn roomtype={roomtype} />
    </Container>
  );
}
