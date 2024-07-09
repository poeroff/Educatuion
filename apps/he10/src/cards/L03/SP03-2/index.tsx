import { L03SP03_2 } from '@/cards/L03/SP03-2/store';
import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import P01 from '../SP03-1/01';
import P02 from '../SP03-1/02';
import P03 from '../SP03-1/03';
import P04 from '../SP03-1/04';
import P05 from './05';
import P06 from './06';
import P07 from '../SP03-1/05';
import P08 from '../SP03-1/06';
import P09 from './09';
import P10 from './10';
import P11 from '../SP03-1/07';
import P12 from '../SP03-1/08';
import P13 from '../SP03-1/09';
import P14 from '../SP03-1/10';
import P15 from '../SP03-1/11';
import P16 from '../SP03-1/12';
import P17 from '../SP03-1/13';
import P18 from '../SP03-1/14';
import P19 from '../SP03-1/15';
import P20 from '../SP03-1/16';
import P21 from './21';
import P22 from './22';
import P23 from './23';
import P24 from './24';
import P25 from '../SP03-1/17';
import P26 from '../SP03-1/18';
import P27 from '../SP03-1/19';

export function SP03_2() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L03SP03_2);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L03-SP03-2`);
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
      <P03 _page='P03' />
      <P04 _page='P04' />
      <P05 />
      <P06 />
      <P07 _page='P07' />
      <P08 _page='P08' />
      <P09 />
      <P10 />
      <P11 />
      <P12 />
      <P13 />
      <P14 />
      <P15 />
      <P16 />
      <P17 _page='P17' />
      <P18 _page='P18' />
      <P19 _page='P19' />
      <P20 _page='P20' />
      <P21 />
      <P22 />
      <P23 />
      <P24 />
      <P25 _page='P25' />
      <P26 _page='P26' />
      <P27 _page='P27' />
    </Page>
  );
}

export default SP03_2;
