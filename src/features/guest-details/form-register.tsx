import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Checkbox from '@/components/checkbox';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { registerSchema } from '@/schemas';

interface IForm {
  name: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
  date_of_birth: string;
}

const Container = tw.div``;

export default function FormRegisterComponent({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { roomtype } = router.query;
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForm>({
    resolver: yupResolver(registerSchema(t)),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
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

          <span className='text-warning-600'>
            {errors.email && errors.email.message}
          </span>

          <span className='text-[10px] text-neutral-300'>
            {t('info.email')}
          </span>

          <span className='text-[12px] text-neutral-500'>
            {t('info.have_account')}{' '}
            <Link
              href={`/room-type/${roomtype}/details?show=login`}
              replace={true}
            >
              <span className='underline'>{t('login')}</span>
            </Link>
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

          <span className='text-warning-600'>
            {errors.name && errors.name.message}
          </span>
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

          <span className='text-warning-600'>
            {errors.lastname && errors.lastname.message}
          </span>
        </div>

        <div className='flex flex-col flex-wrap justify-between gap-2 py-3'>
          <Typography variant='sm' weight='semibold' className='' tag='label'>
            {t('form.date_of_birth.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('date_of_birth')}
              type='text'
              placeholder={t('form.date_of_birth.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.date_of_birth,
                },
              )}
            />

            <span
              className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
                block: errors.date_of_birth,
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
            {errors.date_of_birth && errors.date_of_birth.message}
          </span>
        </div>

        <div className='mb-3 flex flex-col flex-wrap justify-between gap-2 py-3'>
          <Typography variant='sm' weight='semibold' tag='label'>
            {t('form.password.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('password')}
              type='password'
              placeholder={t('form.password.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.password,
                },
              )}
            />

            <span
              className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
                block: errors.password,
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
            {errors.password && errors.password.message}
          </span>
        </div>

        <div className='mb-3 flex flex-col flex-wrap justify-between gap-2 py-3'>
          <Typography variant='sm' weight='semibold' tag='label'>
            {t('form.password_confirmation.label')}
          </Typography>

          <div className='relative'>
            <input
              {...register('password_confirmation')}
              type='password'
              placeholder={t('form.password_confirmation.placeholder')}
              className={cn(
                'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                {
                  'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                    errors.password_confirmation,
                },
              )}
            />

            <span
              className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
                block: errors.password_confirmation,
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
            {errors.password_confirmation &&
              errors.password_confirmation.message}
          </span>
        </div>

        <Typography variant='xs' className='mb-6'>
          {t('info.termsandconditions')}
        </Typography>

        <Button
          className='mt-3 w-full font-semibold'
          variant='primary'
          type='submit'
          disabled={isSubmitting}
        >
          {t('button.accept')}
        </Button>

        <Typography variant='xs' className='my-6 text-neutral-500'>
          {t('info.offers')}
        </Typography>

        <Checkbox
          label={t('info.no_promo')}
          labelClassName='text-neutral-500 font-normal text-xs'
        />
      </form>
    </Container>
  );
}
