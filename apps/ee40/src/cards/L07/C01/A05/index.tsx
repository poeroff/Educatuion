import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P05 from './05';
import P06 from './06';
import P07 from './07';
import P09 from './09';
import P10 from './10';
import P08 from './08';
import P01 from './01';
import P04 from './04';

export function A05() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P05 />
      <P04 />
      <P06 />
      <P07 />
      <P08 />
      <P09 />
      <P10 />
    </Page>
  );
}

export default A05;
