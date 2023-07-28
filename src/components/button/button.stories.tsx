import type { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonVariant } from '.';

/** Renders a Button component */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ButtonVariant,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** This is the primary button, used for CTA  */
export const Primary: Story = {
  args: {
    children: 'Confirmar y Reserva',
    variant: ButtonVariant.PRIMARY,
    onClick: () => null,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Confirmar y Reserva',
    variant: ButtonVariant.SECONDARY,
  },
};

export const Alternative: Story = {
  args: {
    children: 'Confirmar y Reserva',
    variant: ButtonVariant.ALTERNATIVE,
  },
};

export const Text: Story = {
  args: {
    children: 'Confirmar y Reserva',
    variant: ButtonVariant.TEXT,
  },
};

export const Warning: Story = {
  args: {
    children: 'Confirmar y Reserva',
    variant: ButtonVariant.WARNING,
  },
};

export const Danger: Story = {
  args: {
    children: 'Confirmar y Reserva',
    variant: ButtonVariant.DANGER,
  },
};
