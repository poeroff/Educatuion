import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { C01000340 } from './store';

export function C0140() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(C01000340);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_C010003-40`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default C0140;
