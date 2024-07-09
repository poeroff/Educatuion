// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getPageId, postUserLog } from '@maidt-cntn/api';
import { pageDataAtom, pageAtom, studentAtom } from '@/stores';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';

export function A07() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [pageData, setPageData] = useRecoilState(pageDataAtom);
  const studentState = useRecoilValue(studentAtom);

  useEffect(() => {
    const getIds = async () => {
      // 초기 list 불러오는 api 호출
      const list = await getPageId(studentState.activeCardId);
      setPageData({ selectedPageId: list[0], pageIdList: list });
      setPage({ selectedPage: 1, pageTotalNums: list.length });
    };
    getIds();
  }, []);

  useEffect(() => {
    if (!page || !pageData.pageIdList || !studentState) return;
    const selectedPageId = pageData.pageIdList[page.selectedPage - 1];
    setPageData({ selectedPageId, pageIdList: pageData.pageIdList });

    selectedPageId && postUserLog(studentState.userId, selectedPageId, 'IN');
  }, [page]);

  return (
    <Page selectedPage={page.selectedPage} setPage={setPage}>
      <P01 />
    </Page>
  );
}

export default A07;
