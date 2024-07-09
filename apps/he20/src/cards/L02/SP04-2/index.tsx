import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from '../SP04-1/01';
import P02 from '../SP04-1/02';
import P03 from '../SP04-1/03';
import P04 from '../SP04-1/04';
import P05 from '../SP04-1/05';
import P06 from '../SP04-1/06';
import P09 from '../SP04-1/07';
import P10 from '../SP04-1/08';
import P13 from '../SP04-1/09';
import P14 from '../SP04-1/10';
import P15 from '../SP04-1/11';
import P07 from './07';
import P08 from './08';
import P11 from './11';
import P12 from './12';
import { L02SP04_2 } from './store';

export function SP04_1() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02SP04_2);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-SP04-2`);
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
      <P05 _page='P05' _store={L02SP04_2} />
      <P06 _page='P06' _store={L02SP04_2} />
      <P07 _page='P07' _store={L02SP04_2} />
      <P08 _page='P08' _store={L02SP04_2} />
      <P09 _page='P09' _store={L02SP04_2} />
      <P10 _page='P10' _store={L02SP04_2} />
      <P11 _page='P11' _store={L02SP04_2} />
      <P12 _page='P12' _store={L02SP04_2} />
      <P13 _page='P13' _store={L02SP04_2} />
      <P14 _page='P14' _store={L02SP04_2} />
      <P15 _page='P15' _store={L02SP04_2} />
    </Page>
  );
}

export default SP04_1;
