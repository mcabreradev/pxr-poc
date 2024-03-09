/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useEventBus from '@/hooks/use-event-bus';
import useHostUrl from '@/hooks/use-hosturl';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { FORM, SIGNIN, URL } from '@/constants';
import { loginSchema } from '@/schemas';

type Props = {
  className?: string;
  roomTypeId: number;
};

interface IForm {
  email: string;
  password: string;
}
``;
const Container = tw.div`
  pb-5
`;

export default function FormLoginComponent({ className, roomTypeId }: Props) {
  const { t } = useTranslation();
  const [type, setType] = useState(FORM.PASSWORD);
  const { urlStatus } = useHostUrl();
  const { getEventData, subscribe, publish } = useEventBus();

  const handleType = useCallback(() => {
    setType(type === FORM.PASSWORD ? FORM.TEXT : FORM.PASSWORD);
  }, [type]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(loginSchema(t)),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    publish({
      eventType: SIGNIN,
      data,
    });
  };

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType || eventType !== SIGNIN) return;

      if (data.err) {
        setError('email', {
          type: 'manual',
        });
        setError('password', {
          type: 'manual',
          message: t('form.password.invalid'),
        });
      }
    },
    [setError, t],
  );

  useEffect(() => {
    subscribe(handlerEvent);
    getEventData(urlStatus);
  }, [getEventData, handlerEvent, subscribe, urlStatus]);

  return (
    <Container className={cn(className)} data-testid='test-element'>
      <Typography variant='h2' weight='normal'>
        {t('title.login')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-8 flex flex-col flex-wrap justify-between gap-4 py-3'>
          <Typography variant='sm' weight='semibold' className='' tag='label'>
            {t('form.email.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('email')}
              type='email'
              placeholder={t('form.email.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm placeholder:text-neutral-300 focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
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

          <Typography variant='xs' className='text-warning-600'>
            {errors.email && errors.email.message}
          </Typography>
        </div>

        <div className='mb-3 flex flex-col flex-wrap justify-between gap-4 py-3'>
          <Typography variant='sm' weight='semibold' tag='label'>
            {t('form.password.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('password')}
              type={type}
              placeholder={t('form.password.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.password,
                },
              )}
            />
            <div className='absolute bottom-0 right-0 mb-[11px] mr-4 flex flex-wrap items-center'>
              <Typography
                variant='xs'
                weight='normal'
                className='underline'
                onClick={handleType}
              >
                {type === FORM.PASSWORD ? t('show') : t('hide')}
              </Typography>

              <span
                className={cn('ml-1 hidden', {
                  flex: errors.password,
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
          </div>

          <Typography variant='xs' className='text-warning-600'>
            {errors.password && errors.password.message}
          </Typography>
        </div>

        <Button
          className='mt-3 w-full font-semibold'
          variant='primary'
          type='submit'
        >
          {t('button.login')}
        </Button>
      </form>

      <Link
        href={`/room-type/${roomTypeId}/details?${URL.ACTION}=forgot`}
        replace={true}
      >
        <Typography className='mt-4 underline'>
          {t('title.forgot_password')}
        </Typography>
      </Link>

      <Link
        href={`/room-type/${roomTypeId}/details?${URL.ACTION}=auth`}
        replace={true}
      >
        <Typography className='mt-4 underline'>
          {t('info.other_options')}
        </Typography>
      </Link>
    </Container>
  );
}
