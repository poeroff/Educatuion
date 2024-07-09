import type { Meta, StoryFn } from '@storybook/react';
import { Box, Button, SymbolTooltip, Typography } from '@maidt-cntn/ui';
import { useState } from 'react';

const meta = {
  title: 'Math/SymbolTooltip',
  component: SymbolTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SymbolTooltip>;

export default meta;

export const Deafult: StoryFn = args => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  return (
    <Box height='200px' paddingRight='200px'>
      <Typography width='200px' align='right'>
        {selected}
      </Typography>
      <Button onClick={() => setIsOpen(true)} data-tooltip-id='symbol-tooltip'>
        툴팁열기
      </Button>
      <SymbolTooltip
        {...args}
        toolTipId='symbol-tooltip'
        isTooltipOpen={isOpen}
        symbols={['correct', 'rectangle', 'triangle', 'incorrect']}
        onOpenChange={rtn => setIsOpen(rtn)}
        onClickSymbol={rtn => setSelected(rtn)}
      />
    </Box>
  );
};
