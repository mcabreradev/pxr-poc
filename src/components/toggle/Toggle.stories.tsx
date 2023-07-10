import type { Meta, StoryObj } from '@storybook/react';

import Toggle from './Toggle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const ToggleWithSubtitle: Story = {
  args: {
    ...Default.args,
    subtitle: 'Subtitle',
  },
};

export const ToogledByDefault: Story = {
  args: {
    ...Default.args,
    toggled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    toggled: false,
    readonly: true,
  },
};

export const ReadOnlyToggled: Story = {
  args: {
    ...Default.args,
    toggled: true,
    readonly: true,
  },
};
