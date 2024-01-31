import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { identificationSchema } from '@/schemas';

type Props = {
  className?: string;
  roomtype: string;
};

interface IForm {
  name: string;
  lastname: string;
  email: string;
}

const Container = tw.div``;

/* Remember to add roomtype to props later when you plan to use it */
export default function FormIdentificationComponent({ className }: Props) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForm>({
    resolver: yupResolver(identificationSchema(t)),
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
          <Typography variant='xs' className='text-warning-600'>
            {errors.email && errors.email.message}
          </Typography>

          <span className='text-[12px] text-neutral-300'>
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

        <Typography variant='xs' className='text-[12px] text-neutral-300'>
          This is a test{' '}
          <Typography variant='xs' className='text-[12px]' tag='a'>
            roadmap
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
