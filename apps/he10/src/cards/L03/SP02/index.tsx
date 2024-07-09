import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { L03SP02 } from './store';
import P09 from './09';
import P10 from './10';
import P11 from './11';
import P12 from './12';
import P13 from './13';
import P01 from '../SP01-1/01';
import P02 from '../SP01-1/02';
import P03 from '../SP01-1/03';
import P08 from '../SP01-1/08';
import P07 from '../SP01-1/07';
import P06 from '../SP01-1/06';
import P05 from '../SP01-1/05';
import P04 from '../SP01-1/04';

const SP02 = () => {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L03SP02);

  const setPageIds = useSetRecoilState(pageIdsAtom);
  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L03-SP02`);
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
      <P05 _page='P05' />
      <P06 _page='P06' />
      <P09 />
      <P10 />
      <P11 />
      <P12 />
      <P13 />
      <P07 />
      <P08 />
    </Page>
  );
};

export default SP02;
