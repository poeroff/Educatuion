import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from './07';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { A04000904_Atom } from './store';

export function A04000904() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(A04000904_Atom);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_A040009-04`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
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
    </Page>
  );
}

export default A04000904;
