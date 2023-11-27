import type { Meta, StoryObj } from '@storybook/react';

import Modal from './';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    header: 'header',
    children: 'body',
    footer: 'footer',
    isOpen: true,
  },
};
