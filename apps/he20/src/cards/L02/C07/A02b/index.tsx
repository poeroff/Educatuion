import { L02C07A02b } from '@/cards/L02/C07/A02b/store';
import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';

export function A02() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C07A02b);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C07-A02b`);
      // const list: number[] = await getPageId(`1011_L01-C10-A02`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
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
      <P05 />
    </Page>
  );
}

export default A02;
