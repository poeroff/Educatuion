import type { Meta, StoryFn } from '@storybook/react';
import Portal from './Portal';
import { Box, Button } from '@maidt-cntn/ui';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Portal',
  component: Portal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Portal>;

export default meta;

export const Default: StoryFn = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      {!isShown && <Button onClick={() => setIsShown(true)}>Open</Button>}
      <Portal isShow={isShown}>
        <Box background='blue' width='500px' height='500px' position='fixed' zIndex='1000' left={200} top={200} hAlign='center' vAlign='center'>
          <Button onClick={() => setIsShown(false)}>X</Button>
        </Box>
      </Portal>
    </>
  );
};
