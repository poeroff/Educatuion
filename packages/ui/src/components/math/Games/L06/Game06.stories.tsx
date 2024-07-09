import type { Meta, StoryObj } from '@storybook/react';
import Game06 from './Game06';

const meta = {
  title: 'Math/L06/Game06',
  component: Game06,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game06>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
