import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import BoxWrap, { Box, IBoxItemProps } from './Box';

const meta = {
  title: 'Atoms/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoxBackgroundGray: Story = {
  args: { children: 'Sample Box', useRound: true, background: 'gray' },
};

export const BoxBackgroundWhite: Story = {
  args: { children: 'Sample Box', useRound: true, background: 'white' },
};

export const BoxBackgroundBlue: Story = {
  args: { children: 'Sample Box', useRound: true, background: 'blue' },
};

export const BoxShadow: Story = {
  args: { children: 'Sample Box', useRound: true, background: 'white', useShadow: true },
};

const Template: StoryFn<typeof Box> = ({ ...args }: IBoxItemProps) => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <BoxWrap useFull>
        <Box useFull>
          <Box {...args}>Left Box</Box>
        </Box>
        <Box useFull>
          <Box {...args}>Right Box</Box>
        </Box>
      </BoxWrap>
    </div>
  );
};

export const BoxWithAlignCenter: StoryFn<typeof Box> = Template.bind({});
BoxWithAlignCenter.args = {
  useFull: true,
  children: 'Sample Box',
  vAlign: 'center',
  hAlign: 'center',
  height: '300px',
  background: 'white',
};

export const BoxWithAlignStart: StoryFn<typeof Box> = Template.bind({});
BoxWithAlignStart.args = {
  useFull: true,
  children: 'Sample Box',
  hAlign: 'flex-start',
  height: '300px',
  background: 'white',
};

export const BoxWithAlignEnd: StoryFn<typeof Box> = Template.bind({});
BoxWithAlignEnd.args = {
  useFull: true,
  children: 'Sample Box',
  hAlign: 'flex-end',
  height: '300px',
  background: 'white',
};
