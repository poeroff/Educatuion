import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import ToggleButton from './ToggleButton';

const meta = {
  title: 'Atoms/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleButton>;

export default meta;

export const Default: StoryFn = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const handleToggle = () => setChecked(!isChecked);

  return <ToggleButton id='1' isChecked={isChecked} onClick={handleToggle} />;
};

export const WithTransition: StoryFn = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const handleToggle = () => setChecked(!isChecked);

  return <ToggleButton id='1' isChecked={isChecked} onClick={handleToggle} isTranslation />;
};
