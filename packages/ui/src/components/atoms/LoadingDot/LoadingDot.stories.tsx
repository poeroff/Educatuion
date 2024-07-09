import type { Meta, StoryFn } from '@storybook/react';
import LoadingDot from './LoadingDot';

const meta = {
  title: 'Atoms/LoadingDot',
  component: LoadingDot,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    dotColor1: {
      description: '첫번째 점의 색상을 설정합니다.',
      table: {
        defaultValue: { summary: '#1E78FF' },
      },
      control: { type: 'color' },
    },
    dotColor2: {
      description: '두번째 점의 색상을 설정합니다.',
      table: {
        defaultValue: { summary: '#1E78FF' },
      },
      control: { type: 'color' },
    },
    dotColor3: {
      description: '세번째 점의 색상을 설정합니다.',
      table: {
        defaultValue: { summary: '#1E78FF' },
      },
      control: { type: 'color' },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingDot>;

export default meta;

const Template: StoryFn = args => {
  return <LoadingDot {...args} />;
};

export const Default = Template.bind({});
