import type { Meta, StoryObj } from '@storybook/react';

import Image from './';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    useSkeleton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: () => <Image
                  src='https://paxer.com/static/production/HOI/00/1079/20561/hash-7c9AG8sEZE-paxer.jpg'
                  alt='image'
                  width={500}
                  height={500}
                  useSkeleton={true}/>,
};

export const Skeleton: Story = {
  render: () => <Image
                  src=''
                  alt='image'
                  width={500}
                  height={500}
                  useSkeleton={true}/>,
};