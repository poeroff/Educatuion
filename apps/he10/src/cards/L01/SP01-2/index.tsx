import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from '../SP01-1/01';
import P02 from '../SP01-1/02';
import P03 from '../SP01-1/03';
import P04 from '../SP01-1/04';
import P11 from '../SP01-1/07';
import P12 from '../SP01-1/08';
import P13 from '../SP01-1/09';
import P14 from '../SP01-1/10';
import P15 from './15';
import P16 from './16';
import P17 from '../SP01-1/11';
import P18 from '../SP01-1/12';
import P19 from './19';
import P20 from './20';
import P21 from '../SP01-1/13';
import P22 from '../SP01-1/14';
import usePageData from '@/hooks/usePageData';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import L01SP012State from './store';
import SP011HE03701 from '@/cards/L01/SP01-1/components/SP011HE03701';

export function SP01_2() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01SP012State);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-SP01-2`);
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
      <SP011HE03701
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'complete'}
        choices={['완료하다', '제출하다', '현대식의']}
        answer={'완료하다'}
        pageNumber='p03'
        store={'SP01-2'}
      />
      <SP011HE03701
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'demanding'}
        choices={['힘든', '개선', '발표']}
        answer={'힘든'}
        pageNumber='p04'
        store={'SP01-2'}
      />
      <SP011HE03701
        pageNumber='p05'
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'virtual'}
        choices={['가상의', '힘든', '놀라운']}
        answer={'가상의'}
        store={'SP01-2'}
      />
      <SP011HE03701
        pageNumber='p06'
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'rewarding'}
        choices={['놀라운', '~을/를 받을 만 하다', '보람 있는']}
        answer={'보람 있는'}
        store={'SP01-2'}
      />
      <SP011HE03701
        pageNumber='p07'
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'보람 있는'}
        answer={'rewarding'}
        store={'SP01-2'}
      />
      <SP011HE03701
        pageNumber='p08'
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'현대식의'}
        answer={'up to date'}
        store={'SP01-2'}
      />
      <SP011HE03701
        pageNumber='p09'
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'발표'}
        answer={'announcement'}
        store={'SP01-2'}
      />
      <SP011HE03701
        pageNumber='p10'
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'놀라운'}
        answer={'remarkable'}
        store={'SP01-2'}
      />
      <P11 />
      <P12 />
      <P13 pageNumber={'p13'} store={'SP01-2'} />
      <P14 pageNumber={'p14'} store={'SP01-2'} />
      <P15 />
      <P16 />
      <P17 pageNumber={'p17'} store={'SP01-2'} />
      <P18 pageNumber={'p18'} store={'SP01-2'} />
      <P19 />
      <P20 />
      <P21 pageNumber={'p21'} store={'SP01-2'} />
      <P22 pageNumber={'p22'} store={'SP01-2'} />
    </Page>
  );
}

export default SP01_2;
