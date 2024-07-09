import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P01 from './01';

export function A05a() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default A05a;
