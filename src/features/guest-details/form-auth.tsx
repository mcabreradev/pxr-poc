import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

interface Props {
  className?: string;
}

const Container = tw.div`
`;

export default function FormAuthComponent({ className }: Props) {
  const router = useRouter();
  const { roomtype } = router.query;
  return (
    <Container className={cn(className)} data-testid='test-element'>
      <div className='flex flex-col flex-wrap justify-between gap-4 py-3 pt-8'>
        <Typography variant='sm' weight='semibold' className='' tag='label'>
          Email
        </Typography>
        <input
          type='email'
          placeholder='Escribe tu email'
          className='form-input mb-3 block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200'
        />

        <Button
          className='w-full'
          variant='primary'
          type='link'
          href={`/room-type/${roomtype}/details?show=login`}
          scroll={false}
        >
          Continuar
        </Button>
      </div>

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
