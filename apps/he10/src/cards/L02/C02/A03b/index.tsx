import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from '../A03/02';
import P03 from './03';
import P04 from '../A03/04';
import usePageData from '@/hooks/usePageData';
import { L02C02A03b } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export interface IProps {
  headerInfo: TMainHeaderInfoTypes;
}
function A03b() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C02A03b);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C02-A03b`);
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
      <P02 />
      <P03 headerInfo={headerInfo} />
      <P04 />
    </Page>
  );
}

export default A03b;
