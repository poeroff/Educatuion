import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from './01';
import P02 from './02';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L02C02A04 } from './store';

export function A04() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C02A04);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C02-A04`);
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
    </Page>
  );
}

export default A04;
