import type { Meta, StoryObj } from '@storybook/react';
import VideoPlayer from './VideoPlayer';
import sampleVideoSource from '@maidt-cntn/assets/example/sample_video.mp4';

const sampleSubtitle = `
1
00:00:00,000 --> 00:00:02,500
Welcome to the Example Subtitle File!

2
00:00:03,000 --> 00:00:06,000
This is a demonstration of SRT subtitles.

3
00:00:07,000 --> 00:00:10,500
You can use SRT files to add subtitles to your videos.

4
00:00:12,000 --> 00:00:15,000
Each subtitle entry consists of a number, a timecode,
and the subtitle text.

5
00:00:16,000 --> 00:00:20,000
The timecode format is hours:minutes:seconds,milliseconds.

6
00:00:21,000 --> 00:00:25,000
You can adjust the timing to match your video.

7
00:00:26,000 --> 00:00:30,000
Make sure the subtitle text is clear and readable.

8
00:00:31,000 --> 00:00:35,000
And that's how you create an SRT subtitle file!

9
00:00:36,000 --> 00:00:40,000
Enjoy adding subtitles to your videos!
`;

const meta = {
  title: 'Molecules/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VideoPlayer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    videoSrc: '/example/sample_video.mp4',
    srtFile: sampleSubtitle,
    width: 600,
    height: 300,
  },
};
