import type { Meta, StoryObj } from '@storybook/react';
import Game02 from './Game02';

const meta = {
  title: 'Math/L03/Game02',
  component: Game02,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Game02>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1280,
    height: 720,
  },
};
