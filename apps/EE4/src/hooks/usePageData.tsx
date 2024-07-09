import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { durationTimer, currentPageSubmittedData, currentPageInputData, pageAtom, pageDataAtom, studentAtom } from '@/stores';
import { getPageId, postUserLog, postUserSave, postTextMoved, postTextLeft } from '@maidt-cntn/api';

const usePageData = () => {
  const [page, setPage] = useRecoilState(pageAtom);
  const [pageData, setPageData] = useRecoilState(pageDataAtom);
  const [isLoading, setIsLoading] = useState(true);
  const studentState = useRecoilValue(studentAtom);
  const duration = useRecoilValue(durationTimer);
  const isSubmit = useRecoilValue(currentPageSubmittedData);
  const currentData = useRecoilValue(currentPageInputData);

  const lrsCommonData = {
    accessToken: studentState.lrsAccessToken,
    siteId: 'STATIC_VALUE',
    homepage: 'STATIC_VALUE',
    userId: String(studentState.userId),
    sessionId: studentState.sessionId,
  };

  useEffect(() => {
    if (!studentState.activeCardId) return;

    const getIds = async () => {
      setIsLoading(true);
      const list = await getPageId(studentState.activeCardId);

      setPageData({ selectedPageId: list[0], pageIdList: list });
      setPage({ selectedPage: 1, pageTotalNums: list.length });
      setIsLoading(false);
    };

    getIds();
  }, [studentState.activeCardId]);

  useEffect(() => {
    if (!page || !pageData.pageIdList || !studentState || isLoading) return;
    const selectedPageId = pageData.pageIdList[page.selectedPage - 1];
    setPageData({ selectedPageId, pageIdList: pageData.pageIdList });

    if (selectedPageId && !isLoading) {
      postUserLog(studentState.userId, selectedPageId, 'IN');
      const lrsData = {
        cardPageId: selectedPageId,
      };
      postTextMoved({ ...lrsCommonData, ...lrsData });
    }
    return () => {
      if (selectedPageId) {
        if (!isSubmit) {
          const saveData = {
            userId: studentState.userId,
            cardPageId: selectedPageId,
            userSubmission: currentData,
            duration,
          };
          postUserSave(saveData);
        }
        postUserLog(studentState.userId, selectedPageId, 'OUT');
        const lrsData = {
          cardPageId: selectedPageId,
          duration,
        };
        postTextLeft({ ...lrsCommonData, ...lrsData });
      }
    };
  }, [page, pageData.pageIdList, studentState]);

  return { page, setPage, pageData, setPageData, studentState };
};

export default usePageData;
