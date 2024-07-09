import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { L03SP01_2 } from './store';
import P01 from '../SP01-1/01';
import P02 from '../SP01-1/02';
import P03 from '../SP01-1/03';
import P04 from '../SP01-1/04';
import P05 from './05';
import P06 from './06';
import P07 from '../SP01-1/05';
import P08 from '../SP01-1/06';
import P09 from './09';
import P10 from './10';
import P11 from '../SP01-1/07';
import P12 from '../SP01-1/08';
import P13 from '../SP01-1/09';
import P14 from '../SP01-1/10';
import P15 from './15';
import P16 from './16';
import P17 from '../SP01-1/11';
import P18 from '../SP01-1/12';
import P20 from './20';
import P19 from './19';
import P21 from '../SP01-1/13';
import P22 from '../SP01-1/14';

const SP01_2 = () => {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const setPageIds = useSetRecoilState(pageIdsAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L03SP01_2);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L03-SP01-2`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(newPageIds);
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
      <P13 _page='P13' />
      <P14 _page='P14' />
      <P15 />
      <P16 />
      <P17 _page='P17' />
      <P18 _page='P18' />
      <P19 />
      <P20 />
      <P21 _page='P21' />
      <P22 _page='P22' />
    </Page>
  );
};

export default SP01_2;
