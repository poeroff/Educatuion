import type { Meta, StoryFn } from '@storybook/react';
import Alert, { IAlertProps } from './Alert';
import { useState } from 'react';

const meta = {
  title: 'Organism/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

const Template: StoryFn<typeof Alert> = (args: IAlertProps) => {
  const [isShow, setShow] = useState(true);
  return (
    <>
      <Alert {...args} isShow={isShow} onClose={() => setShow(false)} />
    </>
  );
};

export const Default: StoryFn<typeof Alert> = Template.bind({});
Default.args = {
  message: '녹음이 완료되지 않았어요.',
  subMessage: '이미 제출하셨습니다. \n다시 제출하시겠습니까?',
  description: `'예' 버튼 클릭 시 \n이전에 제출한 내용은 삭제됩니다.`,
  closeLabel: '확인',
};
