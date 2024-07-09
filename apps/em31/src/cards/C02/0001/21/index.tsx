import { pageAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import P01 from '@/cards/C02/0001/21/01';
import P02 from '@/cards/C02/0001/21/02';
import { C02000121_store } from '@/cards/C02/0001/21/store';

export function C02000121() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(C02000121_store);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_C020001-21`);
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

export default C02000121;
