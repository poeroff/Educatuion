import type { Meta, StoryObj } from '@storybook/react';
import Image, { EImageType } from './Image';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/images/ME1-L1-C02-P01.png',
    alt: '백그라운드로 들어가는 이미지 대체 텍스트',
    type: EImageType.IMG_BG,
    width: '200px',
    height: '100px',
  },
};

export const Img_TAG: Story = {
  args: {
    src: '/sampleImage.png',
    alt: '이미지 대체 텍스트',
    type: EImageType.IMG,
    size: '100%',
  },
};
