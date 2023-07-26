import type { Meta, StoryObj } from '@storybook/react';

import Typography, {
  TextFontWeight,
  TextVariant,
} from '@/components/typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Headings: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-4 p-4'>
      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.h1}>h1 SemiBold</Typography>
        <Typography variant={TextVariant.h1} weight={TextFontWeight.medium}>
          h1 Medium
        </Typography>
        <Typography variant={TextVariant.h1} weight={TextFontWeight.normal}>
          h1 Regular
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 24px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.h2}>h2 SemiBold</Typography>
        <Typography variant={TextVariant.h2} weight={TextFontWeight.medium}>
          h2 Medium
        </Typography>
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
          h2 Regular
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 20px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.h3}>h3 SemiBold</Typography>
        <Typography variant={TextVariant.h3} weight={TextFontWeight.medium}>
          h3 Medium
        </Typography>
        <Typography variant={TextVariant.h3} weight={TextFontWeight.normal}>
          h3 Regular
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 16px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.h4}>h4 SemiBold</Typography>
        <Typography variant={TextVariant.h4} weight={TextFontWeight.medium}>
          h4 Medium
        </Typography>
        <Typography variant={TextVariant.h4} weight={TextFontWeight.normal}>
          h4 Regular
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 14px
        </Typography>
      </div>
    </div>
  ),
};

export const Paragraphs: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4'>
      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.base} weight={TextFontWeight.light}>
          base light
        </Typography>
        <Typography variant={TextVariant.base} weight={TextFontWeight.normal}>
          base normal
        </Typography>
        <Typography variant={TextVariant.base} weight={TextFontWeight.medium}>
          base medium
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 14px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.sm} weight={TextFontWeight.light}>
          Sm light
        </Typography>
        <Typography variant={TextVariant.sm} weight={TextFontWeight.normal}>
          Sm normal
        </Typography>
        <Typography variant={TextVariant.sm} weight={TextFontWeight.medium}>
          Sm medium
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 14px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.xs} weight={TextFontWeight.light}>
          Xs light
        </Typography>
        <Typography variant={TextVariant.xs} weight={TextFontWeight.normal}>
          Xs normal
        </Typography>
        <Typography variant={TextVariant.xs} weight={TextFontWeight.medium}>
          Xs medium
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 13px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.xs2} weight={TextFontWeight.light}>
          2 Xs light
        </Typography>
        <Typography variant={TextVariant.xs2} weight={TextFontWeight.normal}>
          2 Xs normal
        </Typography>
        <Typography variant={TextVariant.xs2} weight={TextFontWeight.medium}>
          2 Xs medium
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 12px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant={TextVariant.xs3} weight={TextFontWeight.light}>
          3 Xs light
        </Typography>
        <Typography variant={TextVariant.xs3} weight={TextFontWeight.normal}>
          3 Xs normal
        </Typography>
        <Typography variant={TextVariant.xs3} weight={TextFontWeight.medium}>
          3 Xs medium
        </Typography>
        <Typography className='justify-self-end' variant={TextVariant.sm2}>
          Font-size: 11px
        </Typography>
      </div>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4'>
      <Typography variant={TextVariant.h1}>The quick brown fox ...</Typography>
      <Typography variant={TextVariant.h2}>The quick brown fox ...</Typography>
      <Typography variant={TextVariant.base}>
        The quick brown fox ...
      </Typography>
      <Typography variant={TextVariant.sm}>The quick brown fox ...</Typography>
      <Typography variant={TextVariant.sm2}>The quick brown fox ...</Typography>
      <Typography variant={TextVariant.xs}>The quick brown fox ...</Typography>
      <Typography variant={TextVariant.xs2}>The quick brown fox ...</Typography>
      <Typography variant={TextVariant.xs3}>The quick brown fox ...</Typography>
    </div>
  ),
};
