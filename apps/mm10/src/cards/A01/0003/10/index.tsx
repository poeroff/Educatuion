import { Page } from '@maidt-cntn/ui';
import P01 from './P01';
import usePageData from '@/hooks/usePageData';

export function C10() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default C10;
