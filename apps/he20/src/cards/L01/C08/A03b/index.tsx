import usePageData from '@/hooks/usePageData';
import { pageAtom, pageIdsAtom } from '@/stores/page';
import { getPageId } from '@maidt-cntn/api';
import { Page } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import { L01C08A03b } from './store';

const imgSrc = '/L01/C08/A03/HE2-L01-C08-A03-P01.jpg';
const imgAlt = `
              이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:
              첫 번째 조각: "Molly seems to be adapting well,"
              두 번째 조각: "and"
              세 번째 조각: "I expect" (expect는 빨간색 글씨로 작성됨)
              네 번째 조각: "her" (her는 초록색 글씨로 작성됨)
              다섯 번째 조각: "to get better soon." (to get은 파란색 글씨로 작성됨)
              이 조각들이 합쳐져서 "Molly seems to be adapting well, and I expect her to get better soon."라는 문장이 된다.
            `;

export function A03b() {
  const [{ selectedPage }, setPage] = useRecoilState(pageAtom);
  const setPageIds = useSetRecoilState(pageIdsAtom);
  const { clearData } = usePageData();
  const resetCardData = useResetRecoilState(L01C08A03b);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    const getIds = async () => {
      const list: number[] = await getPageId(`${appId}_L01-C08-A03b`);
      const newPageIds = list.map((item, idx) => ({ page: `P${(idx + 1).toString().padStart(2, '0')}`, pageId: item }));
      setPageIds(newPageIds);
    };
    getIds();

    return () => {
      clearData();
      resetCardData();
    };
  }, []);

  return (
    <Page selectedPage={selectedPage} setPage={setPage}>
      <P01 imgSrc={imgSrc} imgAlt={imgAlt} />
      <P02 imgSrc={imgSrc} imgAlt={imgAlt} />
      <P03 imgSrc={imgSrc} imgAlt={imgAlt} />
    </Page>
  );
}

export default A03b;
