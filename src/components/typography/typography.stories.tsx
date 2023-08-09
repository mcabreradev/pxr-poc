import type { Meta, StoryObj } from '@storybook/react';

import Typography from '@/components/typography';

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
        <Typography variant='h1'>h1 SemiBold</Typography>
        <Typography variant='h1' weight='medium'>
          h1 Medium
        </Typography>
        <Typography variant='h1' weight='normal'>
          h1 Regular
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 24px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='h2'>h2 SemiBold</Typography>
        <Typography variant='h2' weight='medium'>
          h2 Medium
        </Typography>
        <Typography variant='h2' weight='normal'>
          h2 Regular
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 20px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='h3'>h3 SemiBold</Typography>
        <Typography variant='h3' weight='medium'>
          h3 Medium
        </Typography>
        <Typography variant='h3' weight='normal'>
          h3 Regular
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 16px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='h4'>h4 SemiBold</Typography>
        <Typography variant='h4' weight='medium'>
          h4 Medium
        </Typography>
        <Typography variant='h4' weight='normal'>
          h4 Regular
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
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
        <Typography variant='base' weight='light'>
          base light
        </Typography>
        <Typography variant='base' weight='normal'>
          base normal
        </Typography>
        <Typography variant='base' weight='medium'>
          base medium
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 14px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='sm' weight='light'>
          Sm light
        </Typography>
        <Typography variant='sm' weight='normal'>
          Sm normal
        </Typography>
        <Typography variant='sm' weight='medium'>
          Sm medium
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 14px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='xs' weight='light'>
          Xs light
        </Typography>
        <Typography variant='xs' weight='normal'>
          Xs normal
        </Typography>
        <Typography variant='xs' weight='medium'>
          Xs medium
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 13px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='xs2' weight='light'>
          2 Xs light
        </Typography>
        <Typography variant='xs2' weight='normal'>
          2 Xs normal
        </Typography>
        <Typography variant='xs2' weight='medium'>
          2 Xs medium
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 12px
        </Typography>
      </div>

      <div className='grid grid-flow-col items-center justify-between gap-4'>
        <Typography variant='xs3' weight='light'>
          3 Xs light
        </Typography>
        <Typography variant='xs3' weight='normal'>
          3 Xs normal
        </Typography>
        <Typography variant='xs3' weight='medium'>
          3 Xs medium
        </Typography>
        <Typography className='justify-self-end' variant='sm2'>
          Font-size: 11px
        </Typography>
      </div>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-4'>
      <Typography variant='h1'>The quick brown fox ...</Typography>
      <Typography variant='h2'>The quick brown fox ...</Typography>
      <Typography variant='base'>The quick brown fox ...</Typography>
      <Typography variant='sm'>The quick brown fox ...</Typography>
      <Typography variant='sm2'>The quick brown fox ...</Typography>
      <Typography variant='xs'>The quick brown fox ...</Typography>
      <Typography variant='xs2'>The quick brown fox ...</Typography>
      <Typography variant='xs3'>The quick brown fox ...</Typography>
    </div>
  ),
};
