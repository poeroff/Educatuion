import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P02 from './02';
import P01 from './01';
import P03 from './03';
import P04 from './04';

export function A02() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
    </Page>
  );
}

export default A02;
