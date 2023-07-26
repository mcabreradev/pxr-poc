import type { Meta, StoryObj } from '@storybook/react';

import Toggle from '.';

/** Renders a Toggle component that allows the user to switch between two states*/
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/** default state untoggled */
export const Default: Story = {
  args: {
    label: 'Label',
  },
};

/** default state untoggled with subtitle */
export const ToggleWithSubtitle: Story = {
  args: {
    ...Default.args,
    subtitle: 'Subtitle',
  },
};

/** default state toggled */
export const ToogledByDefault: Story = {
  args: {
    ...Default.args,
    toggled: true,
  },
};

/** default state untoggled and readonly */
export const ReadOnly: Story = {
  args: {
    ...Default.args,
    toggled: false,
    readonly: true,
  },
};

/** default state toggled and readonly */
export const ReadOnlyToggled: Story = {
  args: {
    ...Default.args,
    toggled: true,
    readonly: true,
  },
};
