import type { Meta, StoryObj } from '@storybook/react';

import Radio from './';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Radio>;

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
