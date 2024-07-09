import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Dialog, { IDialog } from './Dialog';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Extend Dialog Title',
  },
};

const Template: StoryFn<typeof Dialog> = ({ ...args }: IDialog<any>) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open Extend Dialog
      </button>
      <Dialog isShow={modalOpen} onClose={handleModalClose} {...args}>
        <div style={{ width: 200, height: 200, border: '3px solid red', color: 'red' }}>sdfsdf</div>
      </Dialog>
    </div>
  );
};

export const ExtendDialogDefault: StoryFn<typeof Dialog> = Template.bind({});
ExtendDialogDefault.args = {
  title: 'Extend Dialog Title',
};

const Template2: StoryFn<typeof Dialog> = ({ ...args }: IDialog<any>) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open Custom Dialog
      </button>
      <Dialog width={700} height={300} useHeader useFooter isShow={modalOpen} onClose={handleModalClose} onConfirm={handleModalOpen} {...args}>
        <div>
          Open Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend
          DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen Extend DialogOpen
          Extend DialogOpen Extend DialogOpen Extend Dialog
        </div>
      </Dialog>
    </div>
  );
};

export const CustomDialog: StoryFn<typeof Dialog> = Template2.bind({});
CustomDialog.args = {
  title: 'hello',
};
