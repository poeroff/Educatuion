import type { Meta, StoryObj } from '@storybook/react';
import { ETagPaint, ETagLine } from '../../../type/Tag/TagType';
import Tag from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
    width: 'auto',
    height: 'auto',
    fontSize: '14px',
    type: ETagPaint.DEFAULT,
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Tag',
    width: 'auto',
    height: 'auto',
    fontSize: '14px',
    type: ETagPaint.PRIMARY,
  },
};

export const Green: Story = {
  args: {
    label: 'Green Tag',
    width: 'auto',
    height: 'auto',
    type: ETagLine.GREEN,
  },
};

export const Blue: Story = {
  args: {
    label: 'Blue Tag',
    width: 'auto',
    height: 'auto',
    type: ETagLine.BLUE,
  },
};

export const Yellow: Story = {
  args: {
    label: 'Yellow Tag',
    width: 'auto',
    height: 'auto',
    type: ETagLine.YELLOW,
  },
};
