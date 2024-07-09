import type { Meta, StoryObj } from '@storybook/react';
import ListHeader from './ListHeader';

const meta = {
  title: 'Molecules/ListHeader',
  component: ListHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    align: 'left',
    children: 'List Header',
  },
};
