import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { Page, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import { useEffect } from 'react';
import { getPageId } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { L04C08A03a } from './store';

export interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  questionText: string;
  imageSrc: string;
  udl: string[];
}
export interface IContentList {
  children: React.ReactNode;
}

export function A03a() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L04C08A03a);

  const setPageIds = useSetRecoilState(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1 : Practice',
    headerPattern: 'text',
  };

  const questionText = 'Fill in the blanks with the correct forms of the given words.';

  const imageSrc = '/L04/C08/A02/HE1-L04-C08-A02-P01.jpg';

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:',
    '첫 번째 조각: "The sentiment is shared by many,"',
    '두 번째 조각: "with" (빨간색 글씨로 작성됨)',
    '세 번째 조각: "coffee shops"',
    '네 번째 조각: "springing" (파란색 글씨로 작성됨)',
    '다섯 번째 조각: "up on every street corner."',
    '이 조각들이 합쳐져서 "The sentiment is shared by many, with coffee shops springing up on every street corner."라는 문장이 된다.',
  ];
  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L04-C08-A03a`);
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
      <P04 headerInfo={headerInfo} questionText={questionText} imageSrc={imageSrc} udl={udl} />
      <P05 headerInfo={headerInfo} questionText={questionText} imageSrc={imageSrc} udl={udl} />
    </Page>
  );
}

export default A03a;
