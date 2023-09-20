import type { Meta, StoryObj } from '@storybook/react';

import BackButton from '.';

const meta: Meta<typeof BackButton> = {
  title: 'Components/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    className: 'border border-solid border-gray-200',
    children: 'Regresar',
  },
};
