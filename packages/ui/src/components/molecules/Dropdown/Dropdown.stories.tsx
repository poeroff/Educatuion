import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '150px',
    tabIndex: 0,
    dropdownList: [
      'ability',
      'friendlinessfriendliness',
      'ability',
      'friendliness',
      'ability',
      'friendliness',
      'ability',
      'friendliness',
      'ability',
      'friendlinessfriendliness',
    ],
    disabled: false,
  },
};
