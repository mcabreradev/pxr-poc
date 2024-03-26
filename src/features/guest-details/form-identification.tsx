/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { useCheckGuestHook, useEventBus, useHostUrl } from '@/hooks';
import { cn } from '@/lib/utils';

import { Button, Icon, Typography } from '@/components';

import { useUserStore } from '@/store';

import { CHECKUSER } from '@/constants';
import { identificationSchema } from '@/schemas';

type Props = {
  className?: string;
  roomTypeId: number;
  email: string | null;
};

interface IForm {
  name: string;
  lastname: string;
  email: string;
}

const Container = tw.div``;

/* Remember to add roomtype to props later when you plan to use it */
export default function FormIdentificationComponent({
  className,
  email,
  roomTypeId,
}: Props) {
  const { t } = useTranslation();
  const { urlStatus } = useHostUrl();
  const { getEventData, subscribe, publish } = useEventBus();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, addUserToStore } = useUserStore();
  const checkGuest = useCheckGuestHook();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IForm>({
    resolver: yupResolver(identificationSchema(t)),
    defaultValues: {
      email: email ? email : undefined,
      name: email && user && email === user.email ? user.given_name : undefined,
      lastname:
        email && user && email === user.email ? user.family_name : undefined,
    },
  });

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType || eventType !== CHECKUSER) return;

      if (data.err) {
        setError('email', {
          type: 'manual',
          message: data.err,
        });
      } else {
        const userData = data.data;
        addUserToStore({ ...userData, isAuth: false });
        const filteredSearchParams: string[] = [];
        searchParams.forEach((key, value) => {
          if (key === 'email' || key === 'action') {
            return;
          } else {
            filteredSearchParams.push(`${key}=${value}`);
          }
        });
        checkGuest(userData);

        router.push(
          `/room-type/${roomTypeId}/payment?` + filteredSearchParams.join('&'),
        );
      }
    },
    [setError, addUserToStore, searchParams, checkGuest, router, roomTypeId],
  );

  useEffect(() => {
    subscribe(handlerEvent);
    getEventData(urlStatus);
  }, [getEventData, handlerEvent, subscribe, urlStatus]);

  const onSubmit: SubmitHandler<IForm> = (data) => {
    publish({
      eventType: CHECKUSER,
      data,
    });
  };

  return (
    <Container className={cn(className, 'pb-5')} data-testid='test-element'>
      <Typography variant='h2' weight='normal'>
        {t('title.register')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col flex-wrap justify-between gap-2 py-3 pt-8'>
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
                block: errors.name,
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

          <span className='text-[13px] text-neutral-300'>
            {t('info.email')}
          </span>
        </div>
        <div className='flex flex-col flex-wrap justify-between gap-2 py-3'>
          <Typography variant='sm' weight='semibold' className='' tag='label'>
            {t('form.name.label')}
          </Typography>
          <div className='relative'>
            <input
              {...register('name')}
              type='text'
              placeholder={t('form.name.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.name,
                },
              )}
            />

            <span
              className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
                block: errors.name,
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
            {errors.name && errors.name.message}
          </Typography>
        </div>

        <div className='flex flex-col flex-wrap justify-between gap-2 py-3'>
          <Typography variant='sm' weight='semibold' className='' tag='label'>
            {t('form.lastname.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('lastname')}
              type='text'
              placeholder={t('form.lastname.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.lastname,
                },
              )}
            />

            <span
              className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
                block: errors.lastname,
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
            {errors.lastname && errors.lastname.message}
          </Typography>
        </div>

        <Typography variant='xs' className='text-[13px] text-neutral-300'>
          {t('terms.part1')} {t('button.accept')}
          {', '}
          {t('terms.part2')}{' '}
          <Typography
            variant='xs'
            className='text-[13px]'
            tag='a'
            href='https://www.google.com'
          >
            {t('terms.service')}
          </Typography>
          {', '}
          <Typography variant='xs' className='text-[13px]' tag='a'>
            {t('terms.payment')}
          </Typography>
          {', '}
          {t('and')}{' '}
          <Typography variant='xs' className='text-[13px]' tag='a'>
            {t('terms.nondiscrimination')}{' '}
          </Typography>
          {t('terms.part3')}{' '}
          <Typography variant='xs' className='text-[13px]' tag='a'>
            {t('terms.privacy')}
          </Typography>
        </Typography>

        <Button
          className='mt-3 font-semibold md:w-full'
          variant='primary'
          type='submit'
          disabled={isSubmitting}
        >
          {t('button.accept')}
        </Button>
      </form>
    </Container>
  );
}
