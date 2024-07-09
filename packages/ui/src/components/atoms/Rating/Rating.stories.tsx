import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Rating from './Rating';
import { ERatingTypes } from '@maidt-cntn/ui';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: StoryFn = args => {
  const [score, setScore] = useState(0);
  return <Rating count={3} ariaLabelText='점' {...args} score={score} onChange={setScore} />;
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readOnly: true,
    score: 2,
  },
};

export const ChangeCount: StoryFn = args => {
  const [score, setScore] = useState(0);
  return <Rating count={5} ariaLabelText='점' {...args} score={score} onChange={setScore} />;
};

export const ChangeScore: StoryFn = args => {
  const [score, setScore] = useState(3);
  return <Rating count={5} ariaLabelText='점' {...args} score={score} onChange={setScore} />;
};

export const Smile1: StoryFn = args => {
  const [score, setScore] = useState(0);
  return <Rating count={3} ariaLabelText='점' type={ERatingTypes.SMILE_1} {...args} score={score} onChange={setScore} />;
};

export const Smile2: StoryFn = args => {
  const [score, setScore] = useState(0);
  return <Rating count={3} ariaLabelText='점' type={ERatingTypes.SMILE_2} {...args} score={score} onChange={setScore} />;
};

export const Smile3: StoryFn = args => {
  const [score, setScore] = useState(0);
  return <Rating count={3} ariaLabelText='점' type={ERatingTypes.SMILE_3} {...args} score={score} onChange={setScore} />;
};
