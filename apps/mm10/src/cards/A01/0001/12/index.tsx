import { Page } from '@maidt-cntn/ui';
import P01 from './P01';
import usePageData from '@/hooks/usePageData';
import P02 from './P02';
import P03 from './P03';

export function C12() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
    </Page>
  );
}

export default C12;
