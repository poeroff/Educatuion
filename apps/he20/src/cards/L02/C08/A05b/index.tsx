import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { L02C08A05bAtom } from './store';

function A05b() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C08A05bAtom);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C08-A05b`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(newPageIds);
    };
    getIds();
  }, [setPageIds]);

  useEffect(
    () => () => {
      clearData();
      resetCardData();
    },
    [],
  );
  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 />
      <P03 />
      <P04 />
      <P05 />
    </Page>
  );
}

export default A05b;
