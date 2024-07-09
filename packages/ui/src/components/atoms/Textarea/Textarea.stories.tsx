import { useState } from 'react';
import Textarea, { ITextarea } from './Textarea';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Textarea',
  },
};

export const readOnly: Story = {
  args: {
    defaultValue: 'read-only Textarea content',
    readOnly: true,
    width: '400px',
  },
};

export const longText: Story = {
  args: {
    defaultValue: 'long Textarea content '.repeat(20),
    width: '400px',
    height: '200px',
  },
};

const Template: StoryFn<typeof Textarea> = ({ ...args }: ITextarea) => {
  const [value, setValue] = useState(args.value);

  return <Textarea {...args} value={value} onChange={event => setValue(event.target.value)} />;
};

export const controlled: StoryFn<typeof Textarea> = Template.bind({});
controlled.args = {
  value: 'controlled Textarea content',
  width: '400px',
};

export const controlledReadOnly: StoryFn<typeof Textarea> = Template.bind({});
controlledReadOnly.args = {
  value: 'controlled read-only Textarea content',
  readOnly: true,
  width: '400px',
  height: '100px',
};
