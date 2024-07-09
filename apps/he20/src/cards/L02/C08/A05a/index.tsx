import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page } from '@maidt-cntn/ui';
import HE2L02C08A05a from '@/cards/L02/C08/A05a/HE2L02C08A05a';
import { L02C08A05a } from './store';
import usePageData from '@/hooks/usePageData';
import { getPageId } from '@maidt-cntn/api';
import { useEffect } from 'react';

export function A05a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C08A05a);
  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C08-A05a`);
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
      <HE2L02C08A05a
        question='1. 회사는 이제부터 고객이 배송비를 지불해야 한다고 주장한다.'
        answer='insists (that) customers (should) pay'
        givenWord='insist, customers, pay'
        questionText={['The company', 'delivery fees from now on.']}
        pageKey='p01'
        pageNumber='P01'
      />
      <HE2L02C08A05a
        question='2. 그녀는 어제 Sam으로부터 전화를 받지 못했다고 주장했다.'
        answer='insisted (that) she received'
        givenWord='insist, receive'
        questionText={['She', 'no phone call from Sam yesterday.']}
        pageKey='p02'
        pageNumber='P02'
      />
      <HE2L02C08A05a
        question='3. 나는 우리가 중요한 결정을 내리기 전에 잠시 기다려야 한다고 제안한다.'
        answer='suggest (that) we (should) wait'
        givenWord='suggest, wait'
        questionText={['I', 'a while before making important decisions.']}
        pageKey='p03'
        pageNumber='P03'
      />
      <HE2L02C08A05a
        question='4. 최근 연구는 비타민 D가 학습과 기억력을 향상시킨다는 것을 시사한다.'
        answer='suggest (that) Vitamin D improves'
        givenWord='suggest, improve, Vitamin D'
        questionText={['Recent studies', 'learning and memory.']}
        pageKey='p04'
        pageNumber='P04'
      />
      <HE2L02C08A05a
        question='5. 그 단체는 의료 센터를 짓기 위해 사람들이 모금할 것을 권유한다.'
        answer='recommends (that) people (should) raise'
        givenWord='recommend, raise, people'
        questionText={['The organization', 'money to build a medical center.']}
        pageKey='p05'
        pageNumber='P05'
      />
    </Page>
  );
}

export default A05a;
