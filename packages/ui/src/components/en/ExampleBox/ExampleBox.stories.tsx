import type { Meta, StoryObj } from '@storybook/react';
import ExampleBox from './ExampleBox';

const meta = {
  title: 'English/ExampleBox',
  component: ExampleBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExampleBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'blue',
    title: 'Default ExampleBox',
    children: <div>샘플</div>,
  },
};
