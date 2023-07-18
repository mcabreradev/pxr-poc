import type { Meta, StoryObj } from '@storybook/react';

import I18nProvider from '@/providers/i18n-provider';

import Footer from '.';

const meta: Meta<typeof Footer> = {
  title: 'App/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <I18nProvider>
        <Story />
      </I18nProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
