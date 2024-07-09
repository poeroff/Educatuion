import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P02 from './02';

export function A04() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P02 />
    </Page>
  );
}

export default A04;
