import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    className: '',
    label: 'Label',
  },
};

export const WithSubtitle: Story = {
  args: {
    ...Default.args,
    subtitle: 'Subtitle',
  },
};

export const SelectedByDefault: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    checked: false,
    disabled: true,
  },
};

export const SelectedAndDisbled: Story = {
  args: {
    ...Default.args,
    checked: true,
    disabled: true,
  },
};
