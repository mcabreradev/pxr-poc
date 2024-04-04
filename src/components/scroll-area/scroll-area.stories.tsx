import type { Meta, StoryObj } from '@storybook/react';

import ScrollArea from './';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Scroll-area',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {
    className: '',
  },
};
