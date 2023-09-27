export default function GuestSkeletonComponent() {
  return (
    <div className='flex h-full animate-pulse flex-col items-center justify-center'>
      <div className='h-64 w-full bg-gray-300' />
      <div className='mx-auto w-full p-4'>
        <h1 className='mt-4 h-2 w-10/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-8/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-8/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-8/12 rounded-lg bg-gray-200' />
      </div>
      <p className='mt-4 h-[1px] w-full rounded-lg bg-gray-200' />

      <div className='mx-auto w-full p-4'>
        <p className='mt-4 h-1 w-11/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-11/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-11/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-11/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-11/12 rounded-lg bg-gray-200' />
        <p className='mt-4 h-1 w-11/12 rounded-lg bg-gray-200' />

        <h1 className='my-10 h-2 w-10/12 rounded-lg bg-gray-200' />

        {/* Amenities */}
        <div className='flex flex-wrap justify-between'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              className='flex w-1/2 flex-row items-center gap-3 py-[5px]'
              key={`ameni-${i}`}
            >
              <div className='h-4 w-4 rounded-full bg-gray-200 '></div>
              <p className='h-[2px] w-2/12 rounded-lg bg-gray-200' />
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 h-10 w-8/12 rounded-lg bg-gray-200' />
    </div>
  );
}
