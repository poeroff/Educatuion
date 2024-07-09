import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import SimpleAudioPlater, { ISimpleAudioPlayerRef } from './SimpleAudioPlayer';
import { useRef } from 'react';
import styled from '@emotion/styled';

const meta = {
  title: 'English/SimpleAudioPlayer',
  component: SimpleAudioPlater,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleAudioPlater>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: props => (
    <div style={{ height: '50px' }}>
      <SimpleAudioPlater {...props} />
    </div>
  ),
  args: {
    audioSrc: '/example/sample_audio.mp3',
  },
};

const RefTemplate: StoryFn<typeof SimpleAudioPlater> = props => {
  const handleRef = useRef<ISimpleAudioPlayerRef>(null);

  return (
    <div>
      <SimpleAudioPlater {...props} ref={handleRef} />
      <PauseButton
        onClick={() => {
          handleRef.current?.changePlayStatus(false);
        }}
      >
        일시정지
      </PauseButton>
      <PauseButton
        onClick={() => {
          handleRef.current?.changePlayStatus(true);
        }}
      >
        재생
      </PauseButton>
    </div>
  );
};

export const PlayChange: StoryFn<typeof SimpleAudioPlater> = RefTemplate.bind({});
PlayChange.args = {
  audioSrc: '/example/sample_audio.mp3',
};

const PauseButton = styled.button`
  font-size: 16px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 4px;
`;
