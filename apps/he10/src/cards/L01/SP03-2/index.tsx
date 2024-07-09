import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';

import P01 from '../SP03-1/01';
import P02 from '../SP03-1/02';
import P11 from '../SP03-1/07';
import P12 from '../SP03-1/08';
import P13 from '../SP03-1/09';
import P14 from '../SP03-1/10';
import P15 from '../SP03-1/11';
import P16 from '../SP03-1/12';
import P17 from '../SP03-1/13';
import P18 from '../SP03-1/14';
import P19 from './19';
import P20 from './20';
import P21 from './21';
import P22 from './22';
import P23 from '../SP03-1/15';
import P24 from '../SP03-1/16';
import P25 from '../SP03-1/17';
import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { L01SP03_2 } from './store';
import { getPageId } from '@maidt-cntn/api';
import SP031HE03701 from '../SP03-1/components/SP031HE03701';

export function SP03_2() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01SP03_2);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-SP03-2`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      console.log(newPageIds);
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
      <SP031HE03701
        pageNumber='p03'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'responsive'}
        choices={['유전적으로', '무작위로', '반응하는']}
        answer={'반응하는'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p04'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'behavior'}
        choices={['행동', '특성', '장치']}
        answer={'행동'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p05'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'anthropologist'}
        choices={['조상', '생물학자', '인류학자']}
        answer={'인류학자'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p06'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'rewarding'}
        choices={['놀라운', '~을/를 받을 만 하다', '보람 있는']}
        answer={'보람 있는'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p07'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'어울리다'}
        answer={'get along'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p08'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'멸종'}
        answer={'extinction'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p09'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'우세한'}
        answer={'superior'}
        store={'SP03-2'}
      />
      <SP031HE03701
        pageNumber='p10'
        headerText={'[Read] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'특성'}
        answer={'attribute'}
        store={'SP03-2'}
      />
      <P11 />
      <P12 />
      <P13 />
      <P14 />
      <P15 pageNumber={'p15'} store={'SP03-2'} />
      <P16 pageNumber={'p16'} store={'SP03-2'} />
      <P17 pageNumber={'p17'} store={'SP03-2'} />
      <P18 pageNumber={'p18'} store={'SP03-2'} />
      <P19 />
      <P20 />
      <P21 />
      <P22 />
      <P23 pageNumber={'p23'} store={'SP03-2'} />
      <P24 pageNumber={'p24'} store={'SP03-2'} />
      <P25 pageNumber={'p25'} store={'SP03-2'} />
    </Page>
  );
}

export default SP03_2;
