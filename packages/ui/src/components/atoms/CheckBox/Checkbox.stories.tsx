import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { Checkbox, ICheckbox } from '@maidt-cntn/ui';

const meta = {
  title: 'Atoms/CheckBox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof Checkbox> = ({ label, ...args }: ICheckbox) => {
  return (
    <>
      <Checkbox type={'check'} name={'checkbox-group'} label={label} {...args} />
      <Checkbox type={'check'} name={'checkbox-group'} label={label} {...args} />
      <Checkbox type={'check'} name={'checkbox-group'} label={label} {...args} />
    </>
  );
};

export const Default: StoryFn<typeof Checkbox> = Template.bind({});
Default.args = {
  label: 'Checkbox label',
};

export const Disabled: StoryFn<typeof Checkbox> = Template.bind({});
Disabled.args = {
  label: 'Checkbox label',
  disabled: true,
};

const AlignTemplate: StoryFn<typeof Checkbox> = ({ label, align, ...args }: ICheckbox) => {
  return (
    <>
      <Checkbox type={'check'} align={align} name={'checkbox-group-align'} label={label} {...args} />
      <Checkbox type={'check'} align={align} name={'checkbox-group-align'} label={label} {...args} />
      <Checkbox type={'check'} align={align} name={'checkbox-group-align'} label={label} {...args} />
    </>
  );
};

export const Horizontal: StoryFn<typeof Checkbox> = AlignTemplate.bind({});
Horizontal.args = {
  label: 'Checkbox label',
  gap: 30,
};

export const Vertical: StoryFn<typeof Checkbox> = AlignTemplate.bind({});
Vertical.args = {
  label: 'Checkbox label',
  align: 'vertical',
  gap: 30,
};

export const CheckboxError: StoryFn<typeof Checkbox> = AlignTemplate.bind({});
CheckboxError.args = {
  label: 'Checkbox label',
  gap: 30,
  isError: true,
};

const TypeTemplate: StoryFn<typeof Checkbox> = ({ label, type, ...args }) => {
  return (
    <>
      <Checkbox type={type} name={'checkbox-group-type'} label={label} {...args}>
        {label}
      </Checkbox>
      <Checkbox type={type} name={'checkbox-group-type'} label={label} {...args}>
        {label}
      </Checkbox>
      <Checkbox type={type} name={'checkbox-group-type'} label={label} {...args}>
        {label}
      </Checkbox>
    </>
  );
};

export const Box: StoryFn<typeof Checkbox> = TypeTemplate.bind({});
Box.args = {
  label: 'Checkbox label',
  align: 'horizontal',
  gap: 30,
  type: 'box',
};

export const BoxError: StoryFn<typeof Checkbox> = TypeTemplate.bind({});
BoxError.args = {
  label: 'Checkbox label',
  align: 'horizontal',
  gap: 30,
  type: 'box',
  isError: true,
};

export const Square: StoryFn<typeof Checkbox> = TypeTemplate.bind({});
Square.args = {
  label: 'Checkbox label',
  align: 'horizontal',
  gap: 30,
  type: 'square',
};

export const SquareError: StoryFn<typeof Checkbox> = TypeTemplate.bind({});
SquareError.args = {
  label: 'Checkbox label',
  align: 'horizontal',
  gap: 30,
  type: 'square',
  isError: true,
};

export const Circle: StoryFn<typeof Checkbox> = TypeTemplate.bind({});
Circle.args = {
  label: 'Checkbox label',
  align: 'horizontal',
  gap: 30,
  type: 'check',
};
