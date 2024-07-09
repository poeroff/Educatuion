import type { Meta, StoryObj } from '@storybook/react';
import InequalitySign from './InequalitySign';
import { EDefaultInequalitySignType, EInequalitySignStatus, EInequalitySignUsage } from '@maidt-cntn/ui';

const meta = {
  title: 'Math/InequalitySign',
  component: InequalitySign,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InequalitySign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.DEFAULT },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const Active: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.DEFAULT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const Equal: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.EQUAL },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const ActiveEqual: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.EQUAL },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const NotEqual: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.NOT_EQUAL },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const ActiveNotEqual: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.NOT_EQUAL },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const BiggerLeft: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_LEFT },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const ActiveBiggerLeft: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_LEFT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const BiggerOrEqualLeft: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_OR_EQUAL_LEFT },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const ActiveBiggerOrEqualLeft: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_OR_EQUAL_LEFT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const BiggerRight: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_RIGHT },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const ActiveBiggerRight: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_RIGHT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const BiggerOrEqualRight: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_OR_EQUAL_RIGHT },
    onClick: () => {
      console.log('clicked!');
    },
  },
};

export const ActiveBiggerOrEqualRight: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_OR_EQUAL_RIGHT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.ACTIVE,
  },
};

export const ErrorEqual: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.EQUAL },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.IS_ERROR,
  },
};

export const ErrorNotEqual: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.NOT_EQUAL },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.IS_ERROR,
  },
};

export const ErrorBiggerLeft: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_LEFT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.IS_ERROR,
  },
};

export const ErrorBiggerOrEqualLeft: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_OR_EQUAL_LEFT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.IS_ERROR,
  },
};

export const ErrorBiggerRight: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_RIGHT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.IS_ERROR,
  },
};

export const ErrorBiggerOrEqualRight: Story = {
  args: {
    inequalitySignProps: { usage: EInequalitySignUsage.DEFAULT, type: EDefaultInequalitySignType.BIGGER_OR_EQUAL_RIGHT },
    onClick: () => {
      console.log('clicked!');
    },
    status: EInequalitySignStatus.IS_ERROR,
  },
};
