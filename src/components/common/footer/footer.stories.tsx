import type { Meta, StoryObj } from '@storybook/react';

import Footer from './';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    className: '',
  },
};
