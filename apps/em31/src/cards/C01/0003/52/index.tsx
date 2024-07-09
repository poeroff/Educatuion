import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';

import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { C01000352 as C01000352_store } from './store';

export function C01000352() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(C01000352_store);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    //console.log("use effect")
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      try {
        const list: number[] = await getPageId(`${appId}_C010003-52`);
        const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
        setPageIds(prev => newPageIds);
      } catch (e) {
        console.log('e - ', e)
      }


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

    </Page>
  );
}

export default C01000352;
