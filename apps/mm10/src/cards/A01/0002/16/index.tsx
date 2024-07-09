import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P01 from './P01';

export function C16() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default C16;
