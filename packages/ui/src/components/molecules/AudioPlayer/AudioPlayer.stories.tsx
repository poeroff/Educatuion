import type { Meta, StoryObj } from '@storybook/react';
import AudioPlayer from './AudioPlayer';

const meta = {
  title: 'English/AudioPlayer',
  component: AudioPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AudioPlayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: props => (
    <div style={{ height: '50px' }}>
      <AudioPlayer {...props} />
    </div>
  ),
  args: {
    audioSrc: '',
    captionSrc: '',
  },
};

export const Opened: Story = {
  render: props => (
    <div style={{ height: '50px' }}>
      <AudioPlayer {...props} />
    </div>
  ),
  args: {
    opened: true,
    audioSrc: '',
    captionSrc: '',
  },
};
