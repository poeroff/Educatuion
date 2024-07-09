import { StoryObj } from '@storybook/react';
import Divexplanation from './Divexplanation';

const meta = {
  title: 'Math/Divexplanation',
  component: Divexplanation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '6÷2=3',
  },
};

export const Explanation: Story = {
  args: {
    children: '10-2-2-2-2-2=0 => 10÷2=5',
    explanation: true,
    count: 5,
  },
};
