import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import { useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { L04C07A03 } from './store';

export function A03() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04C07A03);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-C07-A03`);
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
    </Page>
  );
}

export default A03;
