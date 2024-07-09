import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P02 from './02';
import P06 from './06';
import P07 from './07';
import P08 from './08';
import P09 from './09';
import P10 from './10';
import P11 from './11';
import P12 from './12';
import P01 from './01';
import P05 from './05';
import P03 from './03';

export function A05() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P05 />
      <P06 />
      <P07 />
      <P08 />
      <P09 />
      <P10 />
      <P11 />
      <P12 />
    </Page>
  );
}

export default A05;
