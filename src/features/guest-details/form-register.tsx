import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';

interface Props {
  className?: string;
}

const Container = tw.div``;

export default function FormRegisterComponent({ className }: Props) {
  const router = useRouter();
  const { roomtype } = router.query;
  return (
    <Container className={cn(className, 'pb-5')} data-testid='test-element'>
      <div className='flex flex-col flex-wrap justify-between gap-4 py-3 pt-8'>
        <Typography variant='sm' weight='semibold' className='' tag='label'>
          Email
        </Typography>
        <input
          type='email'
          placeholder='Escribe tu email'
          className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
        />
      </div>

      <div className='flex flex-col flex-wrap justify-between gap-4 py-3'>
        <Typography variant='sm' weight='semibold' className='' tag='label'>
          Nombre
        </Typography>
        <input
          type='text'
          placeholder='Escribe tu Nombre'
          className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
        />
      </div>

      <div className='flex flex-col flex-wrap justify-between gap-4 py-3'>
        <Typography variant='sm' weight='semibold' className='' tag='label'>
          Apellido
        </Typography>
        <input
          type='text'
          placeholder='Escribe tu Apellido'
          className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
        />
      </div>

      <div className='flex flex-col flex-wrap justify-between gap-4 py-3'>
        <Typography variant='sm' weight='semibold' className='' tag='label'>
          Fecha de nacimiento
        </Typography>
        <input
          type='text'
          placeholder='dd/mm/aaaa'
          className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
        />
      </div>

      <div className='mb-3 flex flex-col flex-wrap justify-between gap-4 py-3'>
        <Typography variant='sm' weight='semibold' tag='label'>
          Contraseña
        </Typography>

        <input
          type='password'
          placeholder='Contraseña'
          className='form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
        />
      </div>

      <Button
        className='mt-3 w-full font-semibold'
        variant='primary'
        type='link'
        href={`/room-type/${roomtype}/details?show=auth`}
        scroll={false}
      >
        Continuar
      </Button>
    </Container>
  );
}
