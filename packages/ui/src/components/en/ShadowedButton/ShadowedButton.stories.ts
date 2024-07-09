import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ShadowedButton } from './ShadowedButton';
import { EStyleShadowedButtonTypes } from '../../../styles/types';

const meta = {
  title: 'English/ShadowedButton',
  component: ShadowedButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      options: [EStyleShadowedButtonTypes.DEFAULT, EStyleShadowedButtonTypes.SUCCESS, EStyleShadowedButtonTypes.WARNING],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ShadowedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    state: EStyleShadowedButtonTypes.DEFAULT,
    fontSize: '1.5rem',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    state: EStyleShadowedButtonTypes.PRIMARY,
    style: { width: '200px' },
    contentLength: 14,
    maxWordLength: 10,
    fontSize: '28px',
  },
};

export const Success: Story = {
  args: {
    label: 'Looooooooooong',
    state: EStyleShadowedButtonTypes.SUCCESS,
    style: { width: '200px' },
    contentLength: 14,
    maxWordLength: 10,
    fontSize: '28px',
  },
};

export const Warning: Story = {
  args: {
    label: 'Short',
    state: EStyleShadowedButtonTypes.WARNING,
    style: { width: '200px' },
    contentLength: 5,
    maxWordLength: 20,
    fontSize: '1.5rem',
  },
};
