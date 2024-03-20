import type { Meta, StoryObj } from '@storybook/react';

import Card from './';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: '',
    id: '1',
    name: 'Card test',
    description: 'Description test',
    maxCapacity: 2,
    standardCapacity: 2,
    rate: 100,
    image: '/hotel/hotel.jpg',
    onClick: () => {},
  },
};
