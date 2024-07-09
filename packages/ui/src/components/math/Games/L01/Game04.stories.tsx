import type { Meta, StoryObj } from '@storybook/react';
import Game04 from './Game04';

const meta = {
  title: 'Math/L01/Game04',
  component: Game04,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game04>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
