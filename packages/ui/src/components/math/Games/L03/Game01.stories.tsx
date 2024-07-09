import type { Meta, StoryObj } from '@storybook/react';
import Game01 from './Game01';

const meta = {
  title: 'Math/L03/Game01',
  component: Game01,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game01>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
