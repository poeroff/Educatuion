import type { Meta, StoryObj } from '@storybook/react';
import RatingList from './RatingList';

const meta = {
  title: 'Math/RatingList',
  component: RatingList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RatingList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { text: '', rating: '' },
      { text: '', rating: '' },
      { text: '', rating: '' },
    ],
    ratingType: 'goal',
  },
};
