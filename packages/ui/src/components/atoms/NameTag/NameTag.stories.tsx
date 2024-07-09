import type { Meta, StoryObj } from '@storybook/react';
import NameTag from './NameTag';

const meta = {
  title: 'Atoms/NameTag',
  component: NameTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NameTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '홍길동',
  },
};

export const WithColor: Story = {
  args: {
    label: '홍길동',
    color: 'var(--color-pink-500)',
  },
};

export const WithStyle: Story = {
  args: {
    label: '홍길동',
    style: { fontSize: '24px', color: 'var(--color-blue-500)' },
  },
};
