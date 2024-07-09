import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Radio, { IRadio } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof Radio> = ({ label, ...args }: IRadio) => {
  return (
    <>
      <Radio type={'circle'} name={'radio-group'} label={label} {...args} />
      <Radio type={'circle'} name={'radio-group'} label={label} {...args} />
      <Radio type={'circle'} name={'radio-group'} label={label} {...args} />
    </>
  );
};

export const Default: StoryFn<typeof Radio> = Template.bind({});
Default.args = {
  label: 'Radio label',
};

const AlignTemplate: StoryFn<typeof Radio> = ({ label, align, ...args }: IRadio) => {
  return (
    <>
      <Radio type={'circle'} align={align} name={'radio-group-align'} label={label} {...args} />
      <Radio type={'circle'} align={align} name={'radio-group-align'} label={label} {...args} />
      <Radio type={'circle'} align={align} name={'radio-group-align'} label={label} {...args} />
    </>
  );
};

export const Horizontal: StoryFn<typeof Radio> = AlignTemplate.bind({});
Horizontal.args = {
  label: 'Radio label',
  align: 'horizontal',
  gap: 30,
};

export const Vertical: StoryFn<typeof Radio> = AlignTemplate.bind({});
Vertical.args = {
  label: 'Radio label',
  align: 'vertical',
  gap: 30,
};

const TypeTemplate: StoryFn<typeof Radio> = ({ label, type, ...args }) => {
  return (
    <>
      <Radio type={type} name={'radio-group-type'} label={label} {...args} />
      <Radio type={type} name={'radio-group-type'} label={label} {...args} />
      <Radio type={type} name={'radio-group-type'} label={label} {...args} />
    </>
  );
};

export const Box: StoryFn<typeof Radio> = TypeTemplate.bind({});
Box.args = {
  label: 'Radio label',
  align: 'horizontal',
  gap: 30,
  type: 'box',
  children: <span>Radio label</span>,
};

export const Square: StoryFn<typeof Radio> = TypeTemplate.bind({});
Square.args = {
  label: 'Radio label',
  align: 'horizontal',
  gap: 30,
  type: 'square',
  children: <span>Radio label</span>,
};

export const Circle: StoryFn<typeof Radio> = TypeTemplate.bind({});
Circle.args = {
  label: 'Radio label',
  align: 'horizontal',
  gap: 30,
  type: 'circle',
};

export const ErrorCircle: StoryFn<typeof Radio> = Template.bind({});
ErrorCircle.args = {
  label: 'Radio label',
  isError: true,
};

export const ErrorBox: StoryFn<typeof Radio> = TypeTemplate.bind({});
ErrorBox.args = {
  label: 'Radio label',
  align: 'horizontal',
  type: 'box',
  isError: true,
  children: <span>Radio label</span>,
};

export const ErrorSquare: StoryFn<typeof Radio> = TypeTemplate.bind({});
ErrorSquare.args = {
  label: 'Radio label',
  align: 'horizontal',
  type: 'square',
  isError: true,
  children: <span>Radio label</span>,
};

const DisabledTemplate: StoryFn<typeof Radio> = ({ label, type = 'circle', ...args }) => {
  return (
    <>
      <Radio type={type} label={label} value {...args} />
      <Radio type={type} label={label} {...args} />
      <Radio type={type} label={label} {...args} />
    </>
  );
};

export const Disabled: StoryFn<typeof Radio> = DisabledTemplate.bind({});
Disabled.args = {
  align: 'horizontal',
  label: 'Radio label',
  gap: 30,
  disabled: true,
  name: 'radio-group-disabled',
};

export const DisabledError: StoryFn<typeof Radio> = DisabledTemplate.bind({});
DisabledError.args = {
  label: 'Radio label',
  disabled: true,
  isError: true,
  name: 'radio-group-disabled-error',
};

export const DisabledBox: StoryFn<typeof Radio> = DisabledTemplate.bind({});
DisabledBox.args = {
  label: 'Radio label',
  gap: 30,
  type: 'box',
  disabled: true,
  align: 'horizontal',
  name: 'radio-group-disabled-box',
  children: <span>Radio label</span>,
};
