import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@maidt-cntn/ui';
import CalculateSolutionTable from './CalculateSolutionTable';

const meta = {
  title: 'Math/CalculateSolutionTable',
  component: CalculateSolutionTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalculateSolutionTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Box width='100px' height='80px'>
      <CalculateSolutionTable {...args} />
    </Box>
  ),
  args: {
    mathExpression: '144-20',
    solutionContents: [1, '/', 4],
  },
};
