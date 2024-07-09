import type { Meta, StoryObj } from '@storybook/react';
import Recorder from './Recorder';

const meta = {
  title: 'English/Recorder',
  component: Recorder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Recorder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div style={{ width: '800px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Recorder {...args} />
    </div>
  ),
  args: {
    recorderIndex: 1,
    reference: 'hello my name is amy',
    onSubmit: () => {},
    onRefresh: () => {},
  },
};
