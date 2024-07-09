import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from './07';
import P08 from './08';
import P09 from './09';
import P10 from './10';
import P11 from './11';
import P12 from './12';
import P13 from './13';
import P14 from './14';
import P15 from './15';
import P16 from './16';
import P17 from './17';
import P18 from './18';
import P19 from './19';
import P20 from './20';
import P21 from './21';
import P22 from './22';
import P23 from './23';
import P24 from './24';
import P25 from './25';

export function B01000100() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const setPageIds = useSetRecoilState(pageIdsAtom);
  const { clearData } = usePageData();

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_B010001-00`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
    };
    getIds();

    return () => {
      clearData();
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
      <P20 />
      <P21 />
      <P22 />
      <P23 />
      <P24 />
      <P25 />
    </Page>
  );
}

export default B01000100;
