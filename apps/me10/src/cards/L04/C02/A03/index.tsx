import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { Page } from '@maidt-cntn/ui';
import { getPageId } from '@maidt-cntn/api';
import { L04C02A03 } from './store';
import P01 from './01';
import P02 from './02';

export function A01() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04C02A03);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-C02-A03`);
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

export default A01;
