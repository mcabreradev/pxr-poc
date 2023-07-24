import type { Meta, StoryObj } from '@storybook/react';

import { mapObject } from '@/lib/utils';

import { TextXs3 } from '@/components/text';

import Icon from './';
import data from './Icon.data.json';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: () => (
    <div className='flex w-full flex-wrap items-center gap-4'>
      {mapObject(data).map(([key, value]) => (
        <div
          key={`key-${value}`}
          className='flex h-24 w-24 flex-col items-center justify-center rounded-lg border-[0.5px] border-gray-200 shadow drop-shadow-md'
        >
          <Icon icon={key} width='20px' />
          <TextXs3 className='mt-2 text-gray-600'>{key}</TextXs3>
        </div>
      ))}
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className='flex w-full flex-wrap items-center gap-4'>
      {mapObject(data).map(([key, value]) => (
        <div
          key={`key-${value}`}
          className='flex h-24 w-24 flex-col items-center justify-center rounded-lg border-[0.5px] border-gray-200 shadow drop-shadow-md'
        >
          <Icon icon={key} width='30' />
          <TextXs3 className='mt-2 text-gray-600'>{key}</TextXs3>
        </div>
      ))}
    </div>
  ),
};

export const Medium: Story = {
  render: () => (
    <div className='flex w-full flex-wrap items-center gap-4'>
      {mapObject(data).map(([key, value]) => (
        <div
          key={`key-${value}`}
          className='flex h-24 w-24 flex-col items-center justify-center rounded-lg border-[0.5px] border-gray-200 shadow drop-shadow-md'
        >
          <Icon icon={key} width='20' />
          <TextXs3 className='mt-2 text-gray-600'>{key}</TextXs3>
        </div>
      ))}
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className='flex w-full flex-wrap items-center gap-4'>
      {mapObject(data).map(([key, value]) => (
        <div
          key={`key-${value}`}
          className='flex h-24 w-24 flex-col items-center justify-center rounded-lg border-[0.5px] border-gray-200 shadow drop-shadow-md'
        >
          <Icon icon={key} width='15' />
          <TextXs3 className='mt-2 text-gray-600'>{key}</TextXs3>
        </div>
      ))}
    </div>
  ),
};
