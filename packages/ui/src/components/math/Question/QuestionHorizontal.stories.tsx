import type { Meta, StoryObj } from '@storybook/react';
import { EOperator } from '../../../type/Question/QuestionType';
import QuestionHorizontal from './QuestionHorizontal';

const meta = {
  title: 'Math/QuestionHorizontal',
  component: QuestionHorizontal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionHorizontal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const horizontalDefault: Story = {
  args: {
    operator: EOperator.Add,
  },
};

export const horizontalHaveTwoValue: Story = {
  args: {
    operator: EOperator.Add,
    firstValue: 11,
    secondValue: 22,
  },
};
