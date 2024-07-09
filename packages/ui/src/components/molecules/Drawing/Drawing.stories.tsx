import type { Meta, StoryObj } from '@storybook/react';
import Drawing from './Drawing';
import sampleImage from '@maidt-cntn/assets/example/sample_image.png';

const meta = {
  title: 'Molecules/Drawing',
  component: Drawing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '800px',
    height: '400px',
    disabled: true,
  },
};

export const WidthBackgroundImage: Story = {
  args: {
    image: {
      src: sampleImage,
      alt: 'sample image',
    },
    width: '100%',
    height: '100%',
  },
};
