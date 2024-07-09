import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L01C06A04 } from './store';

export interface IHeaderInfo {
  headerInfo: TMainHeaderInfoTypes;
}

export function A04() {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong  (2/5)',
    headerPattern: 'text',
  };

  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01C06A04);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-C06-A04`);
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
      <P01 headerInfo={headerInfo} />
      <P02 headerInfo={headerInfo} />
      <P03 headerInfo={headerInfo} />
    </Page>
  );
}

export default A04;
