import type { Meta, StoryFn } from '@storybook/react';
import Input from './Input';
import { useState } from 'react';
import { InputStatus } from '@maidt-cntn/ui';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

const Template: StoryFn = args => {
  const [value, setValue] = useState('');

  return <Input {...args} value={value} onChange={event => setValue(event.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '텍스트를 입력하세요',
};

export const Correct = Template.bind({});
Correct.args = {
  placeholder: '텍스트를 입력하세요',
  status: InputStatus.CORRECT,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: '텍스트를 입력하세요',
  status: InputStatus.ERROR,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Disabled',
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  value: 'Read Only',
  readonly: true,
};
