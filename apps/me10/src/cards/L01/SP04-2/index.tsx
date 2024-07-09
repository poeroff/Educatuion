import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from '../SP04-1/01';
import P02 from '../SP04-1/02';
import P03 from '../SP04-1/03';
import P04 from '../SP04-1/04';
import P05 from '../SP04-1/05';
import P06 from '../SP04-1/06';
import P07 from '../SP04-1/07';
import P08 from '../SP04-1/08';
import P09 from '../SP04-1/09';
import P10 from '../SP04-1/10';
import P11 from '../SP04-1/11';
import P12 from '../SP04-1/12';
import P13 from '../SP04-1/13';
import P14 from './14';
import P15 from '../SP04-1/14';
import P16 from './16';
import P17 from '../SP04-1/15';
import P18 from './18';
import P19 from '../SP04-1/16';
import P20 from './20';
import P21 from '../SP04-1/17';
import P22 from '../SP04-1/18';
import P23 from '../SP04-1/19';
import usePageData from '@/hooks/usePageData';
import { L01SCP0402 } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function SP04_2() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01SCP0402);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-SP04-2`);
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
      <P09 />
      <P10 />
      <P11 />
      <P12 />
      <P13 />
      <P14 />
      <P15 pageKey='P15' />
      <P16 />
      <P17 pageKey='P17' />
      <P18 />
      <P19 pageKey='P19' />
      <P20 />
      <P21 pageKey='P21' />
      <P22 pageKey='P22' />
      <P23 pageKey='P23' />
    </Page>
  );
}

export default SP04_2;
