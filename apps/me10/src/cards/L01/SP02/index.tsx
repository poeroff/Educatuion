import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from '../SP01-1/07';
import P08 from '../SP01-1/08';
import P09 from './09';
import P10 from './10';
import P11 from './11';
import P12 from './12';
import P13 from './13';
import { L01SP02 } from './store';

export function A02() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const setPageIds = useSetRecoilState(pageIdsAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01SP02);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-SP02`);
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
    </Page>
  );
}

export default A02;
