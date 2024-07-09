import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import HE10L03C08A05a, { IHE10L03C08A05a } from './HE10L03C08A05a';
import usePageData from '@/hooks/usePageData';
import { L03C08A05a } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function A05a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L03C08A05a);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L03-C08-A05a`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  const P01Props: IHE10L03C08A05a = {
    pageKey: 'P01',
  };

  const P02Props: IHE10L03C08A05a = {
    pageKey: 'P02',
  };

  const P03Props: IHE10L03C08A05a = {
    pageKey: 'P03',
  };

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <HE10L03C08A05a {...P01Props} />
      <HE10L03C08A05a {...P02Props} />
      <HE10L03C08A05a {...P03Props} />
    </Page>
  );
}

export default A05a;
