import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RecordButton } from './RecordButton';

const meta: Meta<typeof RecordButton> = {
  title: 'English/RecordButton',
  component: RecordButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      options: ['start', 'listen', 'speak', 'stop'],
      control: { type: 'radio' },
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
  args: {
    label: 'start',
  },
};

export const Listen: Story = {
  args: {
    label: 'listen',
  },
};

export const Speak: Story = {
  args: {
    label: 'speak',
  },
};

export const Stop: Story = {
  args: {
    label: 'stop',
  },
};

export const MyAnswer: Story = {
  args: {
    label: 'myAnswer',
  },
};
