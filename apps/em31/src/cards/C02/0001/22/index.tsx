import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import { C02000122_store } from './store';

export function C02000122() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(C02000122_store);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_C020001-22`);
      const newPageIds = list.map((item, idx) => {
        const number = idx + 1;
        const page = (number || '').toString();
        return { page: `P${page.padStart(2, '0')}`, pageId: item };
      });
      console.log(newPageIds);
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

export default C02000122;
