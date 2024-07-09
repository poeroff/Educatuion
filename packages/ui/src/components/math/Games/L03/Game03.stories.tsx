import type { Meta, StoryObj } from '@storybook/react';
import Game03 from './Game03';

const meta = {
  title: 'Math/L03/Game03',
  component: Game03,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game03>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
