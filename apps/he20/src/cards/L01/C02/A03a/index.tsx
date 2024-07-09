import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import { L01C02A03a } from './store';
import { IAudioPlayerProps, Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from '../A03/02';
import P03 from './03';
import P04 from '../A03/04';

export function A03a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01C02A03a);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-C02-A03a`);
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
    audioSrc: '/L01/C02/A03/HE2-L01-C02-A03-01.mp3',
    captionSrc: '/L01/C02/A03/HE2-L01-C02-A03-01.srt',
  };

  const audioInfo2: IAudioPlayerProps = {
    audioSrc: '/L01/C02/A03/HE2-L01-C02-A03-02.mp3',
    captionSrc: '/L01/C02/A03/HE2-L01-C02-A03-02.srt',
  };

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 headerInfo={headerInfo} audioInfo={audioInfo1} />
      <P02 headerInfo={headerInfo} audioInfo={audioInfo1} />
      <P03 headerInfo={headerInfo} audioInfo={audioInfo2} />
      <P04 headerInfo={headerInfo} audioInfo={audioInfo2} />
    </Page>
  );
}

export default A03a;
