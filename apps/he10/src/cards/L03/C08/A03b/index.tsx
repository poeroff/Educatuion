import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L03C08A03b } from './store';

export interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  questionText: string;
  imageSrc: string;
  udl: string[];
}
export interface IContentList {
  children: React.ReactNode;
}

export function A03b() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L03C08A03b);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1 : Practice',
    headerPattern: 'text',
  };

  const questionText = 'Rewrite the sentences, starting with the underlined parts.';
  const imageSrc = '/L03/C08/A02/HE1-L03-C08-A02-P01.jpg';
  const udl: string[] = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:',
    '첫 번째 조각: "Rarely" (빨간색 글씨로 작성됨)',
    '두 번째 조각: "do" (파란색 글씨로 작성됨)',
    '세 번째 조각: "people" (초록색 글씨로 작성됨)',
    '네 번째 조각: "want" (파란색 글씨로 작성됨)',
    '다섯 번째 조각: "to put up with a lot of noise."',
    '이 조각들이 합쳐져서 "Rarely do people want to put up with a lot of noise."라는 문장이 된다.',
  ];

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L03-C08-A03b`);
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
      <P01 headerInfo={headerInfo} questionText={questionText} imageSrc={imageSrc} udl={udl} />
      <P02 headerInfo={headerInfo} questionText={questionText} imageSrc={imageSrc} udl={udl} />
      <P03 headerInfo={headerInfo} questionText={questionText} imageSrc={imageSrc} udl={udl} />
    </Page>
  );
}

export default A03b;
