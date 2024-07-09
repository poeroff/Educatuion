import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';

import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L01SCP0302 } from './store';
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
import P16 from './16';
import P17 from './17';
import P18 from '../SP03-1/12';
import P19 from '../SP03-1/13';
import P20 from './20';
import P21 from './21';
import P22 from '../SP03-1/14';
import P23 from '../SP03-1/15';
import P24 from '../SP03-1/16';

const SP03_2 = () => {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01SCP0302);

  const setPageIds = useSetRecoilState(pageIdsAtom);
  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-SP03-2`);
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
      <P07 pageNo='P07' />
      <P08 pageNo='P08' />
      <P09 />
      <P10 />
      <P11 />
      <P12 />
      <P13 />
      <P14 pageNo='P14' />
      <P15 pageNo='P15' />
      <P16 />
      <P17 />
      <P18 pageNo='P18' />
      <P19 pageNo='P19' />
      <P20 />
      <P21 />
      <P22 pageNo='P22' />
      <P23 pageNo='P23' />
      <P24 pageNo='P24' />
    </Page>
  );
};

export default SP03_2;
