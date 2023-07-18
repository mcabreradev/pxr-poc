import type { Meta, StoryObj } from '@storybook/react';

import Button from './';

/** Renders a Button component */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    type: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'alternative',
        'warning',
        'danger',
        'text',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** This is the primary button, used for CTA  */
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
