import type { Meta, StoryObj } from '@storybook/react';
import Game05 from './Game05';

const meta = {
  title: 'Math/L04/Game05',
  component: Game05,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game05>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
