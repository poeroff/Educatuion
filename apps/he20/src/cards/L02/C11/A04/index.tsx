import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import { L02C11A04 } from './store';
import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export interface IProps {
  headerInfo: TMainHeaderInfoTypes;
}

export function A04() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C11A04);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C11-A04`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
    headerPattern: 'text',
  };

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 headerInfo={headerInfo} />
      <P02 headerInfo={headerInfo} />
    </Page>
  );
}

export default A04;
