import type { Meta, StoryObj } from '@storybook/react';
import SvgIcon, { ESvgType } from './SvgIcon';
import sampleIconSrc from '@maidt-cntn/assets/example/sample_icon.svg';
import sample from '../../../assets/sampleImage.png';

const meta = {
  title: 'Atoms/SvgIcon',
  component: SvgIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SvgIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: sampleIconSrc,
    type: ESvgType.IMG,
    width: '200px',
    height: '200px',
  },
};

export const ImageBgType: Story = {
  args: {
    width: '400px',
    height: '400px',
    title: '타이틀입니다.',
    src: `${sample}`,
    type: ESvgType.IMG_BG,
  },
};
