import { Page } from '@maidt-cntn/ui';
import P01 from './P01';
import P02 from './P02';
import P03 from './P03';
import P04 from './P04';
import P05 from './P05';
import usePageData from '@/hooks/usePageData';

export function C16() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
      <P05 />
    </Page>
  );
}

export default C16;