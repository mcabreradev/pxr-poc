import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { authSchema } from '@/schemas';

interface IForm {
  email: string;
}

type Props = {
  className?: string;
};

const Container = tw.div`
`;

export default function FormAuthComponent({ className }: Props) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(authSchema(t)),
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
            {...register('email', { required: true, maxLength: 50 })}
            type='email'
            placeholder='Escribe tu email'
            className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
          />

          <span className='text-red-600'>
            {errors.email && errors.email.message}
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

      <hr />

      <div className='flex flex-col gap-5 py-3 pb-10'>
        <Button
          className='w-full'
          variant='secondary'
          icon={<Icon variant='google' height='24' />}
        >
          Continuar con Google
        </Button>

        <Button
          className='w-full'
          variant='secondary'
          icon={<Icon variant='facebook' height='24' />}
        >
          Continuar con Facebook
        </Button>

        <Button
          className='w-full'
          variant='secondary'
          icon={<Icon variant='apple' height='24' />}
        >
          Continuar con Apple
        </Button>
      </div>
    </Container>
  );
}
