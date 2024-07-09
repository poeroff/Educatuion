import type { Meta, StoryObj } from '@storybook/react';
import ChipButton, { EAlignType, EChipButtonType } from './ChipButton';

const meta = {
  title: 'Molecules/ChipButton',
  component: ChipButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChipButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnselectedHorizontal: Story = {
  args: {
    status: EChipButtonType.DRAG,
    align: EAlignType.HORIZONTAL,
    isActive: false,
  },
};

export const SelectedHorizontal: Story = {
  args: {
    status: EChipButtonType.DRAG,
    align: EAlignType.HORIZONTAL,
    isActive: true,
  },
};

export const UnselectVertical: Story = {
  args: {
    status: EChipButtonType.DRAG,
    align: EAlignType.VERTICAL,
    isActive: false,
  },
};

export const SelectedVertical: Story = {
  args: {
    status: EChipButtonType.DRAG,
    align: EAlignType.VERTICAL,
    isActive: true,
  },
};

export const SelectedTrue: Story = {
  args: {
    status: EChipButtonType.TRUE,
    isActive: true,
    size: '44px',
  },
};

export const UnselectedTrue: Story = {
  args: {
    status: EChipButtonType.TRUE,
    isActive: false,
    size: '44px',
  },
};

export const ErrorTrue: Story = {
  args: {
    status: EChipButtonType.TRUE,
    isActive: true,
    isError: true,
    size: '44px',
  },
};

export const SelectedFalse: Story = {
  args: {
    status: EChipButtonType.FALSE,
    isActive: true,
    size: '44px',
  },
};

export const UnselectedFalse: Story = {
  args: {
    status: EChipButtonType.FALSE,
    isActive: false,
    size: '44px',
  },
};

export const ErrorFalse: Story = {
  args: {
    status: EChipButtonType.FALSE,
    isActive: true,
    size: '44px',
    isError: true,
  },
};

export const SelectedO: Story = {
  args: {
    status: EChipButtonType.O,
    isActive: true,
    size: '44px',
  },
};

export const UnselectedO: Story = {
  args: {
    status: EChipButtonType.O,
    isActive: false,
    size: '44px',
  },
};

export const ErrorO: Story = {
  args: {
    status: EChipButtonType.O,
    isActive: true,
    isError: true,
    size: '44px',
  },
};

export const SelectedX: Story = {
  args: {
    status: EChipButtonType.X,
    isActive: true,
    size: '44px',
  },
};

export const UnselectedX: Story = {
  args: {
    status: EChipButtonType.X,
    isActive: false,
    size: '44px',
  },
};

export const ErrorX: Story = {
  args: {
    status: EChipButtonType.X,
    isActive: true,
    isError: true,
    size: '44px',
  },
};

export const EnabledUp: Story = {
  args: {
    status: EChipButtonType.UP,
    disabled: false,
    size: '44px',
  },
};

export const DisabledUp: Story = {
  args: {
    status: EChipButtonType.UP,
    disabled: true,
    size: '44px',
  },
};

export const EnabledDown: Story = {
  args: {
    status: EChipButtonType.DOWN,
    disabled: false,
    size: '44px',
  },
};

export const DisabledDown: Story = {
  args: {
    status: EChipButtonType.DOWN,
    disabled: true,
    size: '44px',
  },
};

export const EnabledCheck: Story = {
  args: {
    status: EChipButtonType.CHECK,
    disabled: false,
    size: '44px',
  },
};

export const DisableCheck: Story = {
  args: {
    status: EChipButtonType.CHECK,
    disabled: true,
    size: '44px',
  },
};

export const EnabledStar: Story = {
  args: {
    status: EChipButtonType.STAR,
    disabled: false,
    size: '44px',
  },
};

export const DisabledStar: Story = {
  args: {
    status: EChipButtonType.STAR,
    disabled: true,
    size: '44px',
  },
};

export const UnselectedNumber: Story = {
  args: {
    status: EChipButtonType.NORMAL,
    hasChildren: true,
    isActive: false,
    size: '44px',
    children: '1',
  },
};

export const SelectedNumber: Story = {
  args: {
    status: EChipButtonType.NORMAL,
    hasChildren: true,
    isActive: true,
    isError: false,
    size: '44px',
    children: '1',
  },
};

export const ErrorNumber: Story = {
  args: {
    status: EChipButtonType.NORMAL,
    hasChildren: true,
    isActive: true,
    isError: true,
    size: '44px',
    children: '1',
  },
};

export const UnselectedLanguage: Story = {
  args: {
    status: EChipButtonType.NORMAL,
    hasChildren: true,
    isActive: false,
    size: '44px',
    children: 'ㄱ',
  },
};

export const SelectedLanguage: Story = {
  args: {
    status: EChipButtonType.NORMAL,
    hasChildren: true,
    isActive: true,
    isError: false,
    size: '44px',
    children: 'ㄱ',
  },
};

export const ErrorLanguage: Story = {
  args: {
    status: EChipButtonType.NORMAL,
    hasChildren: true,
    isActive: true,
    isError: true,
    size: '44px',
    children: 'ㄱ',
  },
};
