import type { Meta, StoryObj } from '@storybook/react';
import Jabber from 'jabber';
import Image from 'next/image';

import Swiper from './';

import placeholder from '~/svg/placeholder.svg';

const jabber = new Jabber();

/** Swipe The Swiper provides an intuitive and engaging user experience, making it easy for users to navigate and explore content on touch devices. */
const meta: Meta<typeof Swiper> = {
  title: 'Components/Swiper',
  component: Swiper,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Swiper>;

export const Images: Story = {
  args: {
    className: 'drop-shadow-md',
    children: (
      <>
        {[...Array(20)].map((_, index) => (
          <Image
            key={`img-${index}`}
            alt='image'
            src={placeholder}
            width={471}
            height={435}
            className='w-full object-cover'
          />
        ))}
      </>
    ),
  },
};

export const Cards: Story = {
  args: {
    className: 'drop-shadow-md',
    children: (
      <>
        {[...Array(20)].map((_, index) => (
          <div
            key={`text-${index}`}
            className='block w-[300px] max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
              {jabber.createParagraph(2)}
            </h5>
            <p className='font-normal text-gray-700'>
              {jabber.createParagraph(20)}
            </p>
          </div>
        ))}
      </>
    ),
  },
};
