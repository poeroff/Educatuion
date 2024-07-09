import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from '@/cards/C03/0004/10/01';
import P02 from '@/cards/C03/0004/10/02';
import P03 from '@/cards/C03/0004/10/03';
import { useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { B03000430_store } from './store';

export function B01000430() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(B03000430_store);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_B030004-30`);
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
      <P01 _page='P01' _store={B03000430_store} />
      <P02 _page='P02' _store={B03000430_store} />
      <P03 _page='P03' _store={B03000430_store} />
    </Page>
  );
}

export default B01000430;
