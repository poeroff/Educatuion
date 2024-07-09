import { Page } from '@maidt-cntn/ui';
import P01 from './P01';
import P02 from './P02';
import usePageData from '@/hooks/usePageData';

export function C04() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
    </Page>
  );
}

export default C04;
