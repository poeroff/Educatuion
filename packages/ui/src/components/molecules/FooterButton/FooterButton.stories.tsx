import type { Meta, StoryObj } from '@storybook/react';
import FooterBtn from './FooterButton';

const meta = {
  title: 'Molecules/FooterBtn',
  component: FooterBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
