import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Confirmar y Reserva',
    type: 'primary',
    onClick: () => null,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Confirmar y Reserva',
    type: 'secondary',
  },
};

export const Alternative: Story = {
  args: {
    children: 'Confirmar y Reserva',
    type: 'alternative',
  },
};

export const Text: Story = {
  args: {
    children: 'Confirmar y Reserva',
    type: 'text',
  },
};

export const Warning: Story = {
  args: {
    children: 'Confirmar y Reserva',
    type: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Confirmar y Reserva',
    type: 'danger',
  },
};
