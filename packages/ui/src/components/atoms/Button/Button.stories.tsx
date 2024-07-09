import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { EStyleButtonTypes } from '../../../styles/types';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: [
        EStyleButtonTypes.PRIMARY,
        EStyleButtonTypes.DEFAULT,
        EStyleButtonTypes.YELLOW,
        EStyleButtonTypes.GRAY,
        EStyleButtonTypes.BLUE,
        EStyleButtonTypes.LIGHTBLUE,
        EStyleButtonTypes.BROWN,
        EStyleButtonTypes.LIGHTBROWN,
      ],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryColor: Story = {
  args: {
    label: 'Primary Button',
    color: EStyleButtonTypes.PRIMARY,
  },
};

export const DefaultColor: Story = {
  args: {
    label: 'Secondary Button',
    color: EStyleButtonTypes.DEFAULT,
  },
};

export const SecondaryColor: Story = {
  args: {
    label: 'Secondary Button',
    color: EStyleButtonTypes.SECONDARY,
  },
};

export const Shadow: Story = {
  args: {
    label: 'Tertiary Button',
    color: EStyleButtonTypes.SECONDARY,
    useRound: true,
    useShadow: true,
  },
};

export const RoundForm: Story = {
  args: {
    label: 'Tertiary Button',
    color: EStyleButtonTypes.SECONDARY,
    useRound: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Tertiary Button',
    color: EStyleButtonTypes.SECONDARY,
    disabled: true,
  },
};

export const YellowColor: Story = {
  args: {
    label: 'Yellow Button',
    color: EStyleButtonTypes.YELLOW,
  },
};

export const Graycolor: Story = {
  args: {
    label: 'Gray Button',
    color: EStyleButtonTypes.GRAY,
  },
};
