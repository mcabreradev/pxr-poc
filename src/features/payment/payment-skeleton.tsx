import { Typography } from '@/components';

export default function PaymentSkeletonComponent() {
  return (
    <div className='animate-pulse'>
      <Typography
        variant='h1'
        className='mb-4 mt-5 h-3 w-[30%] rounded-full bg-gray-300'
      >
        &nbsp;
      </Typography>

      <div className='flex flex-row justify-between'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[95%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>

      <div className='flex flex-row justify-between pb-5'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[95%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>

      <div className='flex flex-row justify-between'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[95%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>

      <div className='flex flex-row justify-between'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[95%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>
      <div className='flex flex-row justify-between pb-5'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[95%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>
      <div className='flex flex-row justify-between'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[95%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
}
