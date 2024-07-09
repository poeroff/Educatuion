import type { Meta, StoryObj } from '@storybook/react';
import Game08 from './Game08';

const meta = {
  title: 'Math/L06/Game08',
  component: Game08,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game08>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
