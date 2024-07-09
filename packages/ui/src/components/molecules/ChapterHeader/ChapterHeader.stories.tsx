import type { Meta, StoryObj } from '@storybook/react';
import ChapterHeader from './ChapterHeader';

const meta = {
  title: 'Molecules/ChapterHeader',
  component: ChapterHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChapterHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chapterNum: '1.',
    mainChapter: '대단원명',
    subChapter: '중단원명',
    minorChapter: '소단원명',
    isVisible: false,
  },
};

export const TimerVisible: Story = {
  args: {
    chapterNum: '1.',
    mainChapter: '대단원명 >',
    subChapter: '중단원명 >',
    minorChapter: '소단원명',
    seconds: 600,
    isVisible: true,
  },
};
