import type { Meta, StoryObj } from '@storybook/react';
import { CustomImage } from './CustomImage';
import sampleImage from '@maidt-cntn/assets/example/sample_image.png';

const meta = {
  title: 'Molecules/CustomImage',
  component: CustomImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'sample image',
  },
};
