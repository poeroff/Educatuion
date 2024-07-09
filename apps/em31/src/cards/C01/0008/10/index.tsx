import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';

import { C01000810_Atom } from './store';
import P01 from './P01';
import P02 from './P02';
import P03 from './P03';
import P04 from './P04';
import P05 from './P05';
import P06 from './P06';
import P07 from './P07';
import P08 from './P08';
import P09 from './P09';

export function C01000810() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(C01000810_Atom);
  const setPageIds = useSetRecoilState(pageIdsAtom);
  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_C010008-10`);
      if (list.length) {
        const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
        setPageIds(newPageIds);
      }
    };
    getIds();
    return () => {
      clearData();
      resetCardData();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
      <P05 />
      <P06 />
      <P07 />
      <P08 />
      <P09 />
    </Page>
  );
}
export default C01000810;
