import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import P01 from '../SP01-1/01';
import P02 from '../SP01-1/02';
import P07 from '../SP01-1/07';
import P08 from '../SP01-1/08';
import P09 from './09';
import P10 from './10';
import P11 from './11';
import P12 from './12';
import P13 from './13';
import SP011HE03701 from '@/cards/L01/SP01-1/components/SP011HE03701';
import usePageData from '@/hooks/usePageData';
import L01SP012State from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function SP02() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01SP012State);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-SP02`);
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
        store={'SP02'}
      />
      <SP011HE03701
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 단어의 알맞은 뜻을 고르세요.'}
        word={'demanding'}
        choices={['힘든', '개선', '발표']}
        answer={'힘든'}
        pageNumber='p04'
        store={'SP02'}
      />
      <SP011HE03701
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'보람 있는'}
        answer={'rewarding'}
        pageNumber='p05'
        store={'SP02'}
      />
      <SP011HE03701
        headerText={'[Listen & Speak] 단어 연습'}
        questionText={'다음 뜻의 알맞은 영어 단어를 쓰세요.'}
        word={'현대식의'}
        answer={'up to date'}
        pageNumber='p06'
        store={'SP02'}
      />
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

export default SP02;
