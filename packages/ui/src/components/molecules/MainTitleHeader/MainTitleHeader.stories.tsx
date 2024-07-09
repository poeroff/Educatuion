import type { Meta, StoryObj } from '@storybook/react';
import MainTitleHeader from './MainTitleHeader';

const meta = {
  title: 'Molecules/MainTitleHeader',
  component: MainTitleHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainTitleHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pattern: 'text',
    title: '타이틀 텍스트',
  },
};

export const IconType: Story = {
  args: {
    pattern: 'icon',
    title: '타이틀 텍스트',
    iconType: 'funActivity',
  },
};

export const NumberType: Story = {
  args: {
    pattern: 'number',
    title: '타이틀 텍스트',
    number: 17,
  },
};
