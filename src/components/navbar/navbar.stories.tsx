import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    className: '',
  },
};
