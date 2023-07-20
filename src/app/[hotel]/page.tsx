'use client';

import Image from 'next/image';

import Carousel from '@/components/carousel';
import Icon from '@/components/icon';

import data from './data.json';
export default function Page({ params }: { params: { hotel: string } }) {
  const { hotel } = params;

  return (
    <div className='pt-[1px]' data-id-test='test-componet'>
      <Carousel>
        {data.images.map((image) => (
          <Image
            key={`img-${image}`}
            alt='...'
            src={image}
            width={980}
            height={551}
            className='h-full w-full object-cover'
          />
        ))}
      </Carousel>

      <section className='p-4 text-black'>
        <span className='text-[24px]'>{data.name}</span>
        <div className='flex flex-row items-center text-[14px]'>
          <Icon icon='star' width='16px' />
          <p className='p-1'>{data.rate}</p>•
          <p className='pl-1 underline hover:cursor-pointer'>{`${
            data.reviews.length
          } ${data.reviews.length > 1 ? 'reseñas' : 'reseña'}`}</p>
        </div>

        <div className='py-1 underline'>{data.address}</div>

        <div className='flex flex-row items-center py-2 underline'>
          <span className='pr-1'>Contacto</span>
          {Object.entries(data?.contact).map(([key, value]) => (
            <a key={`contacto-${key}-${value}`} className='px-1' href={value}>
              <Icon icon={key} width='18px' color='gray' />
            </a>
          ))}
        </div>

        <div className='box-border h-px w-full border-t-[1px] border-solid border-white-200' />

        <p className='my-2 text-2sm'>{data.description}</p>
      </section>

      <section className='p-4 pt-0'>
        <span className='text-[20px]'>Nuestro hotel ofrece</span>
      </section>
    </div>
  );
}
