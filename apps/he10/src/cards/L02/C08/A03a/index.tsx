import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import usePageData from '@/hooks/usePageData';
import { L02C08A03a } from './store';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';

export function A03a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);

  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L02C08A03a);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L02-C08-A03a`);
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
    headerText: 'Point 1 :  Practice',
  };

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:',
    '첫 번째 조각: "I was shocked to see"',
    '두 번째 조각: "how thin" (빨간색과 파란색 글씨로 작성됨)',
    '세 번째 조각: "Nani Tama" (빨간색 글씨로 작성됨)',
    '네 번째 조각: "was."',
    '이 조각들이 합쳐져서 "I was shocked to see how thin Nani Tama was."라는 문장이 된다.',
  ];

  const imageSrc = '/L02/C08/A03/HE1-L02-C08-A03-P01.jpg';

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 headerInfo={headerInfo} udl={udl} imageSrc={imageSrc} />
      <P02 headerInfo={headerInfo} udl={udl} imageSrc={imageSrc} />
      <P03 headerInfo={headerInfo} udl={udl} imageSrc={imageSrc} />
    </Page>
  );
}

export default A03a;
