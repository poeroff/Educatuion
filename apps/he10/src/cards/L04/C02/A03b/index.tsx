import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import P01 from './01';
import P02 from '../A03/02';
import P03 from './03';
import P04 from '../A03/04';
import { IAudioPlayerProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L04C02A03b } from './store';

export function A03b() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04C02A03b);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-C02-A03b`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(prev => newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const audioInfo1: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE1-L04-C02-A03-01.mp3',
    captionSrc: '/L04/C02/A03/HE1-L04-C02-A03-01.srt',
  };

  const audioInfo2: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE1-L04-C02-A03-02.mp3',
    captionSrc: '/L04/C02/A03/HE1-L04-C02-A03-02.srt',
  };

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 />
      <P02 headerInfo={headerInfo} audioInfo={audioInfo1} />
      <P03 />
      <P04 headerInfo={headerInfo} audioInfo={audioInfo2} />
    </Page>
  );
}

export default A03b;
