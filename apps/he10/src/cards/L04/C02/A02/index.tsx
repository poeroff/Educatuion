import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import usePageData from '@/hooks/usePageData';
import { L04C02A02 } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function A02() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04C02A02);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-C02-A02`);
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
    </Page>
  );
}

export default A02;
