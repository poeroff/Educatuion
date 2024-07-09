import { useState } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import InequalitySignBox from './InequalitySignBox';
import { EDefaultInequalitySignType, Box } from '@maidt-cntn/ui';

const meta: Meta<typeof InequalitySignBox> = {
  title: 'Math/InequalitySignBox',
  component: InequalitySignBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InequalitySignBox>;

export const Default: StoryFn = () => {
  const [value, setValue] = useState<EDefaultInequalitySignType | undefined>(undefined);
  return (
    <Box width='600px' height='200px' vAlign='center'>
      <InequalitySignBox
        toolTipId='tooltip-1'
        leftQuestionText='367+232'
        rightQuestionText='590'
        value={value}
        onChange={(type: EDefaultInequalitySignType) => setValue(type)}
      />
    </Box>
  );
};

export const IsError: Story = {
  render: args => (
    <Box width='600px' height='80px'>
      <InequalitySignBox {...args} />
    </Box>
  ),
  args: {
    toolTipId: 'tooltip-2',
    leftQuestionText: '367+232',
    rightQuestionText: '590',
    value: EDefaultInequalitySignType.EQUAL,
    isError: true,
    readOnly: true,
  },
};
