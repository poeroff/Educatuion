import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from '../SP03-1/01';
import P02 from '../SP03-1/02';
import P03 from '../SP03-1/03';
import P04 from '../SP03-1/04';
import P05 from '../SP03-1/05';
import P06 from '../SP03-1/06';
import P07 from '../SP03-1/07';
import P08 from '../SP03-1/08';
import P09 from '../SP03-1/09';
import P10 from '../SP03-1/10';
import P11 from '../SP03-1/11';
import P12 from '../SP03-1/12';
import P13 from '../SP03-1/13';
import P14 from '../SP03-1/14';
import P15 from '../SP03-1/15';
import P16 from '../SP03-1/16';
import P17 from '../SP03-1/17';
import P18 from '../SP03-1/18';
import P19 from '../SP03-1/19';
import usePageData from '@/hooks/usePageData';
import { L02SP03_1 } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function SP03_1() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02SP03_1);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-SP03-1`);
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
      <P15 />
      <P16 />
      <P17 />
      <P18 />
      <P19 />
    </Page>
  );
}

export default SP03_1;
