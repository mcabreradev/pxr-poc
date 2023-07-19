import type { Meta, StoryObj } from '@storybook/react';

import Icon from './';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    className: '',
  },
};
