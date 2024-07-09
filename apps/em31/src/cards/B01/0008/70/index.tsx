import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { B01000870_Atom } from './store';
import P01 from './01';
import P02 from './02';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';

export function B01000870() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(B01000870_Atom);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    console.log('appId: ', appId);
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_B010008-70`);
      console.log('list: ', list);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      console.log('newPageIds: ', newPageIds);
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

export default B01000870;
