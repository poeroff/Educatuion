import { useState } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { IPageAtom } from '@maidt-cntn/ui';
import Footer from './Footer';

const meta = {
  title: 'Molecules/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorType: 'white',
    selectedPage: 1,
    pageTotalNums: 2,
  },
};

export const WithControlledState: StoryFn = args => {
  const [page, setPage] = useState<IPageAtom>({ selectedPage: 1, pageTotalNums: 10 });
  return <Footer selectedPage={page.selectedPage} pageTotalNums={page.pageTotalNums} setPage={setPage} />;
};
