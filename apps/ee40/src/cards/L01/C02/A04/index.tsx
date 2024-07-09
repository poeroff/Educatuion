// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getPageId, postUserLog } from '@maidt-cntn/api';
import { pageDataAtom, pageAtom, studentAtom } from '@/stores';
import { Page } from '@maidt-cntn/ui';
import P01 from './01';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from './07';
import P08 from './08';

export function A04() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [pageData, setPageData] = useRecoilState(pageDataAtom);
  const studentState = useRecoilValue(studentAtom);

  useEffect(() => {
    const appId = import.meta.env.VITE_APP_ID;
    console.log(appId);
    const getIds = async () => {
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
      <P02 />
      <P03 />
      <P04 />
      <P05 />
      <P06 />
      <P07 />
      <P08 />
    </Page>
  );
}

export default A04;
