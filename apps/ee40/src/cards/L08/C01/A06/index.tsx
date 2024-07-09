import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P05 from './05';
// import P01 from './01';

export function A06() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      {/* <P01 /> */}
      <P05 />
    </Page>
  );
}

export default A06;
