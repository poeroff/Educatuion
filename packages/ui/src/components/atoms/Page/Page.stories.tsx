import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Page from './Page';
import { Box, IPageAtom, Button } from '@maidt-cntn/ui';

const meta = {
  title: 'Atoms/Page',
  component: Page,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Page>;

export default meta;

export const Default: StoryFn = () => {
  const [page, setPage] = useState<IPageAtom>({ selectedPage: 1, pageTotalNums: 2 });
  return (
    <Page
      selectedPage={page.selectedPage}
      setPage={setPage}
      children={
        <Box background='blue' width='300px' height='200px' vAlign='center' hAlign='center'>
          페이지 1
        </Box>
      }
    />
  );
};

export const MovePage: StoryFn = () => {
  const [page, setPage] = useState<IPageAtom>({ selectedPage: 1, pageTotalNums: 2 });
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Page selectedPage={page.selectedPage} setPage={setPage}>
        <Box background='blue' width='300px' height='200px' vAlign='center' hAlign='center'>
          페이지 1
        </Box>
        <Box background='blue' width='300px' height='200px' vAlign='center' hAlign='center'>
          페이지 2
        </Box>
      </Page>
      <Button
        label={page.selectedPage === 1 ? '>' : '<'}
        onClick={() => setPage(page.selectedPage === 1 ? { ...page, selectedPage: 2 } : { ...page, selectedPage: 1 })}
      />
    </div>
  );
};
