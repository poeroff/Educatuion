import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from '../SP04-1/01';
import P02 from '../SP04-1/02';
import P03 from '../SP04-1/03';
import P04 from '../SP04-1/04';
import P05 from '../SP04-1/05';
import P06 from '../SP04-1/06';
import P07 from './07';
import P08 from './08';
import P09 from '../SP04-1/07';
import P10 from '../SP04-1/08';
import P11 from './11';
import P12 from './12';
import P13 from '../SP04-1/09';
import P14 from '../SP04-1/10';
import P15 from '../SP04-1/11';

import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { L04SP04_2 } from './store';
import { getPageId } from '@maidt-cntn/api';

const SP03_2 = () => {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04SP04_2);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-SP04-2`);
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
      <P01 />
      <P02 />
      <P03 />
      <P04 />
      <P05 />
      <P06 />
      <P07 />
      <P08 />
      <P09 _page='P09' />
      <P10 _page='P10' />
      <P11 />
      <P12 />
      <P13 _page='P13' />
      <P14 _page='P14' />
      <P15 _page='P15' />
    </Page>
  );
};

export default SP03_2;
