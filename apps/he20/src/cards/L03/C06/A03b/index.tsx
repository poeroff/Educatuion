import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { usePageData } from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import { HE20L03C06A03bAtom } from './store';

export function A03b() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(HE20L03C06A03bAtom);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L03-C06-A03b`);
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
    </Page>
  );
}

export default A03b;
