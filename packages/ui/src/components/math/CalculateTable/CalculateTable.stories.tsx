import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@maidt-cntn/ui';
import CalculateTable from './CalculateTable';

const meta = {
  title: 'Math/CalculateTable',
  component: CalculateTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalculateTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Box width='100px' height='80px'>
      <CalculateTable {...args} />
    </Box>
  ),
  args: {
    mathExpression: '144+20',
  },
};
