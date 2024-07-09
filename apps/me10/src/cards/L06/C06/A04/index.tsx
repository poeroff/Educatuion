import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { L06C06A04 } from './store';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';

export function A04() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const setPageIds = useSetRecoilState(pageIdsAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L06C06A04);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L06-C06-A04`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
    </Page>
  );
}

export default A04;
