import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Page } from '@maidt-cntn/ui';
import { getPageId } from '@maidt-cntn/api';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C06A03a } from './store';

import P01 from './01';
import P02 from './02';
import P03 from './03';

export function A03a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04C06A03a);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-C06-A03a`);
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
    </Page>
  );
}

export default A03a;