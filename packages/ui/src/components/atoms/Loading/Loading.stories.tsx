import type { Meta, StoryFn } from '@storybook/react';
import Loading from './Loading';

const meta = {
  title: 'Atoms/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

const Template: StoryFn = args => {
  return <Loading {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  isShow: true,
};

export const NotShown = Template.bind({});
NotShown.args = {
  isShow: false,
};

export const Message = Template.bind({});
Message.args = {
  isShow: true,
  message: 'Customized Message',
};
