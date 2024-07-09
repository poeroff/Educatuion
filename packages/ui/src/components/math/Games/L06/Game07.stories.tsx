import type { Meta, StoryObj } from '@storybook/react';
import Game07 from './Game07';

const meta = {
  title: 'Math/L06/Game07',
  component: Game07,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game07>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
