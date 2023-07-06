import type { Meta, StoryObj } from '@storybook/react';

import Radio from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    className: '',
    label: 'Toggle me',
  },
};
