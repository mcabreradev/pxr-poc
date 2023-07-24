import type { Meta, StoryObj } from '@storybook/react';

import {
  Heading,
  HeadingBold,
  HeadingMedium,
  Text,
  TextBold,
  TextMedium,
  TextSm,
  TextSmBold,
  TextSmLight,
  TextSmMedium,
  TextXs,
  TextXs2,
  TextXs2Light,
  TextXs2Medium,
  TextXs3,
  TextXs3Light,
  TextXs3Medium,
  TextXsLight,
  TextXsMedium,
  Title,
  TitleBold,
  TitleMedium,
} from '@/components/text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Headings: Story = {
  args: {
    className: '',
  },
  render: () => (
    <div className='flex w-full flex-col gap-4'>
      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <HeadingBold>h1 SemiBold</HeadingBold>
        <HeadingMedium>h1 Medium</HeadingMedium>
        <Heading>h1 Regular</Heading>
        <TextSm className='justify-self-end'>Font-size: 24px</TextSm>
      </div>

      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TitleBold>h2 SemiBold</TitleBold>
        <TitleMedium>h2 Medium</TitleMedium>
        <Title>h2 Regular</Title>
        <TextSm className='justify-self-end'>Font-size: 20px</TextSm>
      </div>

      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TextBold>h3 SemiBold</TextBold>
        <TextMedium>h3 Medium</TextMedium>
        <Text>h3 Regular</Text>
        <TextSm className='justify-self-end'>Font-size: 16px</TextSm>
      </div>

      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TextSmBold>h4 SemiBold</TextSmBold>
        <TextSmMedium>h4 Medium</TextSmMedium>
        <TextSm>h4 Regular</TextSm>
        <TextSm className='justify-self-end'>Font-size: 14px</TextSm>
      </div>
    </div>
  ),
};

export const Paragraphs: Story = {
  args: {
    className: '',
  },
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TextSmLight>SM light</TextSmLight>
        <TextSm>SM regular</TextSm>
        <TextSmMedium>SM medium</TextSmMedium>
        <TextSm className='justify-self-end'>Font-size: 14px</TextSm>
      </div>

      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TextXsLight>XS light</TextXsLight>
        <TextXs>XS regular</TextXs>
        <TextXsMedium>XS medium</TextXsMedium>
        <TextSm className='justify-self-end'>Font-size: 13px</TextSm>
      </div>

      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TextXs2Light>2XS light</TextXs2Light>
        <TextXs2>2XS regular</TextXs2>
        <TextXs2Medium>2XS medium</TextXs2Medium>
        <TextSm className='justify-self-end'>Font-size: 12px</TextSm>
      </div>

      <div className='grid grid-flow-col items-center justify-stretch gap-8'>
        <TextXs3Light>3XS light</TextXs3Light>
        <TextXs3>3XS regular</TextXs3>
        <TextXs3Medium>3XS medium</TextXs3Medium>
        <TextSm className='justify-self-end'>Font-size: 11px</TextSm>
      </div>
    </div>
  ),
};
