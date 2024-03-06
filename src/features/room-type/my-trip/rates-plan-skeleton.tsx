import { Typography } from '@/components';

export default function RatesSkeletonComponent() {
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
          className='mb-2 h-2 w-[65%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>

        <Typography
          variant='sm'
          className='mb-2 h-2 w-[20%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>
      <div className='flex flex-row justify-between'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[65%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>

        <Typography
          variant='sm'
          className='mb-2 h-2 w-[20%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>

      <Typography
        variant='h1'
        className='mb-4 mt-4 h-3 w-[30%] rounded-full bg-gray-300'
      >
        &nbsp;
      </Typography>
      <div className='flex flex-row justify-between'>
        <Typography
          variant='sm'
          className='mb-2 h-2 w-[65%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>

        <Typography
          variant='sm'
          className='mb-2 h-2 w-[20%] rounded-full bg-gray-300'
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
}
