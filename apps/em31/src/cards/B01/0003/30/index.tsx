import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import usePageData from '../../../../hooks/usePageData';
import { useEffect } from 'react';
import { B01000330_Atom } from './store';

export function B01000330() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(B01000330_Atom);

  const setPageIds = useSetRecoilState(pageIdsAtom);
  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getPage = async () => {
      const list: number[] = await getPageId(`${appId}_B010003-30`);
      if (list.length) {
        const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
        setPageIds(newPageIds);
      }
    };

    getPage();

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

export default B01000330;
