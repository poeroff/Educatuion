import { StoryObj } from '@storybook/react';
import Typography from './Typography';
import { ETypographyTypes } from '../../../styles/types';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Typography',
  },
};

export const Body: Story = {
  args: {
    children: 'Body Typography',
    styleType: ETypographyTypes.BODY,
  },
};

export const Title: Story = {
  args: {
    children: 'Title Typography',
    styleType: ETypographyTypes.TITLE,
  },
};

export const Caption: Story = {
  args: {
    children: 'Caption Typography',
    styleType: ETypographyTypes.CAPTION,
  },
};

export const Color: Story = {
  args: {
    children: 'Red Color Typography',
    color: 'red',
  },
};

export const Bold: Story = {
  args: {
    children: 'Bold Typography',
    weight: 800,
  },
};
