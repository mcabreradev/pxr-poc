import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';

import { FORM } from '@/constant';
import { loginSchema } from '@/schemas';

interface IForm {
  email: string;
  password: string;
}

const Container = tw.div`
  pb-5
`;

export default function FormLoginComponent({
  className,
}: {
  className?: string;
}) {
  const { t } = useTranslation();

  const [type, setType] = useState(FORM.PASSWORD);
  const handleType = useCallback(() => {
    setType(type === FORM.PASSWORD ? FORM.TEXT : FORM.PASSWORD);
  }, [type]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(loginSchema(t)),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Container className={cn(className)} data-testid='test-element'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col flex-wrap justify-between gap-4 py-3 pt-8'>
          <Typography variant='sm' weight='semibold' className='' tag='label'>
            Email
          </Typography>
          <input
            {...register('email', { required: true, maxLength: 20 })}
            type='email'
            placeholder='Escribe tu email'
            className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
          />
          <span className='text-red-600'>
            {errors.email && errors.email.message}
          </span>
        </div>

        <div className='relative mb-3 flex flex-col flex-wrap justify-between gap-4 py-3'>
          <Typography variant='sm' weight='semibold' tag='label'>
            Contraseña
          </Typography>

          <span
            className='absolute right-0 top-0 mr-4 mt-[3.6rem]'
            onClick={handleType}
          >
            <Typography variant='xs' weight='normal' className='underline'>
              {type === FORM.PASSWORD ? t('show') : t('hide')}
            </Typography>
          </span>

          <input
            {...register('password', { required: true, maxLength: 20 })}
            type={type}
            placeholder='Contraseña'
            className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
          />

          <span className='text-red-600'>
            {errors.password && errors.password.message}
          </span>
        </div>

        <Button
          className='mt-3 w-full font-semibold'
          variant='primary'
          type='submit'
        >
          {t('button.continue')}
        </Button>
      </form>
    </Container>
  );
}
