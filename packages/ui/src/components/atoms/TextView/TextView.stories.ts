import type { Meta, StoryObj } from '@storybook/react';
import TextView from './TextView';
import { ETextViewColor } from '@maidt-cntn/ui';

const meta = {
  title: 'Atoms/TextView',
  component: TextView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '보기',
    children: 'test',
  },
};

export const SizedLabel: Story = {
  args: {
    title: '보기',
    children: 'test',
  },
};

export const Chip: Story = {
  args: {
    title: 'Review Notes',
    children: 'test',
    type: ETextViewColor.SKYBLUE,
  },
};
