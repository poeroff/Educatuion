import type { Meta, StoryFn } from '@storybook/react';
import Layout from './ELayout';
import { useState } from 'react';
import { Box, IPageAtom, Page } from '@maidt-cntn/ui';

const meta = {
  title: 'English/ELayout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Default: StoryFn = () => {
  const [page, setPage] = useState<IPageAtom>({ selectedPage: 1, pageTotalNums: 10 });

  return (
    <Layout
      chapterInfo={{ chapterNum: '1.', mainChapter: '대단원... >', subChapter: '중단원... >', minorChapter: '소단원... >' }}
      backColor='blue'
      footerInfo={{ footerColorType: 'white' }}
      selectedPage={page.selectedPage}
      pageTotalNums={page.pageTotalNums}
      setPage={setPage}
      isVisible={true}
      seconds={70}
    >
      <Page selectedPage={page.selectedPage} setPage={setPage}>
        {numbers.map((number, index) => {
          return (
            <Box key={index} background='gray' width='100%' height='100%' vAlign='center' hAlign='center'>
              페이지 {number}
            </Box>
          );
        })}
      </Page>
    </Layout>
  );
};
