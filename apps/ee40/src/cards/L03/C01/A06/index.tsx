import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import P04 from './04';
// import P01 from './01';

export function A06() {
  const { page, setPage } = usePageData();

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      {/* <P01 /> */}
      <P04 />
    </Page>
  );
}

export default A06;
