import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P03 from './03';
import P01 from './01';

export function A09() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P03 />
    </Page>
  );
}

export default A09;
