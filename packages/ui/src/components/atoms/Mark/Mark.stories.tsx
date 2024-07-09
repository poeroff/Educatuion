import type { Meta, StoryObj } from '@storybook/react';
import Mark from './Mark';

const meta = {
  title: 'Atoms/Mark',
  component: Mark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Mark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Correct: Story = {
  args: {
    type: 'correct',
    size: 'small',
    children: '1',
  },
};

export const InCorrect: Story = {
  args: {
    type: 'incorrect',
    size: 'small',
    children: '1',
  },
};

export const Middle: Story = {
  args: {
    type: 'incorrect',
    size: 'middle',
    children: '1',
  },
};

export const Large: Story = {
  args: {
    type: 'incorrect',
    size: 'large',
  },
};
