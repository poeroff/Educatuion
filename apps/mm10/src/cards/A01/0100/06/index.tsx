import { Page } from '@maidt-cntn/ui';

import P02 from './02';
import P03 from './03';
import usePageData from '@/hooks/usePageData';

export function C06() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P02 />
      <P03 />
    </Page>
  );
}

export default C06;
