import type { Meta, StoryObj } from '@storybook/react';

import Sticky from './';

const meta: Meta<typeof Sticky> = {
  title: 'Components/Sticky',
  component: Sticky,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Sticky>;

export const Default: Story = {
  args: {},
};
