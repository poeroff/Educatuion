import type { Meta, StoryObj } from '@storybook/react';
import Stamp from './Stamp';
import { EStampType } from '@maidt-cntn/ui';

const meta = {
  title: 'Atoms/Stamp',
  component: Stamp,
  argTypes: {
    stampType: {
      options: [EStampType.Excellent, EStampType.Good, EStampType.Soso],
      control: { type: 'radio' },
      defaultValue: EStampType.Excellent,
    },
    isClicked: {
      control: 'boolean',
      defaultValue: true,
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stamp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stampType: EStampType.Excellent,
    isClicked: true,
  },
};
