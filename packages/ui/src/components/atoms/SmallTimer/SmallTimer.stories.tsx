import type { Meta, StoryObj } from '@storybook/react';
import SmallTimer from './SmallTimer';

const meta = {
  title: 'Atoms/SmallTimer',
  component: SmallTimer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SmallTimer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    seconds: 77,
  },
};
