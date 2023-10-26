import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

import { useState } from 'react';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { selectRoomSchema } from '@/schemas';

interface IForm {
  date: string;
  guests: string;
}

const Container = tw.div`
sticky bottom-0 top-5 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg`;

export default function GuestFormComponent({ className }: Props) {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(selectRoomSchema()),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Container className={cn(className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='sm' weight='semibold' className='mb-4'>
          Llegada - Salida
        </Typography>

        <div className='relative'>
          <input
            {...register('date')}
            type='date'
            placeholder='mar 01 - mar 07'
            className={cn(
              'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm placeholder:text-neutral-300 focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
              {
                'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                  errors.date,
              },
            )}
          />

          <span
            className={cn('absolute bottom-0 right-0 mb-[13px] mr-4 hidden', {
              block: errors.date,
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

        <Typography variant='sm' weight='semibold' className='my-4'>
          Huéspedes
        </Typography>

        <hr />

        <Typography variant='sm' weight='semibold' className='mb-4'>
          Desde $100.00 x noche
        </Typography>

        <Button
          type='submit'
          scroll={true}
          className='mb-4 md:w-full'
          onClick={handleDropDown}
        >
          {t('button.choose-room')}
        </Button>
      </form>
    </Container>
  );
}
