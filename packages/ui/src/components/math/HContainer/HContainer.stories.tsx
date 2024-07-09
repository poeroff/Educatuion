import { Meta, StoryObj } from '@storybook/react';
import HContainer from './HContainer';
import { Box } from '@maidt-cntn/ui';

const meta = {
  title: 'Math/HContainer',
  component: HContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Box width='100px' height='80px'>
      <HContainer {...args} />
    </Box>
  ),
  args: {
    headerInfo: { headerPattern: 'text', headerText: 'Header' },
  },
};

export const WithQuestion: Story = {
  render: args => (
    <Box width='300px' height='100px'>
      <HContainer {...args} />
    </Box>
  ),
  args: {
    headerInfo: { headerPattern: 'icon', headerText: '대답해보아요', iconType: 'selfCheck' },
    questionInfo: { size: 'small', text: '밥은 먹었나요?' },
  },
};

export const WithSubmit: Story = {
  render: args => (
    <Box height='100px'>
      <HContainer {...args} />
    </Box>
  ),
  args: {
    headerInfo: { headerPattern: 'icon', headerText: '대답해보아요', iconType: 'selfCheck' },
    submitLabel: '제출하기',
    onSubmit: () => {
      alert('제출완료');
    },
  },
};

export const ContainerWithQuestion: Story = {
  render: args => (
    <Box height='100px'>
      <HContainer {...args} />
    </Box>
  ),
  args: {
    headerInfo: { headerPattern: 'icon', headerText: '대답해보아요', iconType: 'selfCheck' },
    questionInfo: { size: 'small', text: '밥은 먹었나요?' },
  },
};

export const WithChildrenContents: Story = {
  render: args => (
    <Box width='500px' height='200px'>
      <HContainer {...args} />
    </Box>
  ),
  args: {
    headerInfo: { headerPattern: 'text', headerText: 'Header' },
    audioInfo: {
      audioSrc: '/example/sample_audio.mp3',
      top: 0,
      right: 0,
    },
    useExtend: true,
    children: <Box background='blue'>듣기</Box>,
  },
};
