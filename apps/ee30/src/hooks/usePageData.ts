import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { postUserSave, postUserSubmission, postUserSubmissionWithResult, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

export const usePageData = () => {
  const [pageData, setPageData] = useRecoilState(pageDataAtom);
  const resetPageData = useResetRecoilState(pageDataAtom);
  const resetPageIds = useResetRecoilState(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageDataRef = useRef(pageData);
  const pageIdsRef = useRef(pageIds);

  const initData = (
    page: string,
    userSubmission: userSubmissionType[] | undefined,
    defaultSubmission: userSubmissionType[],
    isSubmitted: boolean,
  ) => {
    setPageData(prevPageData => {
      const isExist = prevPageData.find(data => data.page === page);
      if (isExist) {
        return prevPageData.map(pd =>
          pd.page === page
            ? {
                ...pd,
                userSubmission: userSubmission && userSubmission.length > 0 ? userSubmission : defaultSubmission,
                isSubmitted,
              }
            : pd,
        );
      } else {
        return [
          ...prevPageData,
          {
            page,
            userSubmission: userSubmission && userSubmission.length > 0 ? userSubmission : defaultSubmission,
            isSubmitted,
          },
        ];
      }
    });
  };

  const changeData = (page: string, mainKey: number, subKey: number, value: any) => {
    setPageData(prevPageData =>
      prevPageData.map(pd =>
        pd.page === page
          ? {
              ...pd,
              userSubmission: pd.userSubmission.map(us =>
                us.mainKey === mainKey
                  ? {
                      ...us,
                      inputData: us.inputData.map(id => (id.subKey === subKey ? { ...id, value: value } : id)),
                    }
                  : us,
              ),
            }
          : pd,
      ),
    );
  };

  const submitDataWithResult = async (page: string, userSubmission: userSubmissionType[], isCorrect: boolean, duration = 0) => {
    setPageData(prevPageData =>
      prevPageData.map(pd =>
        pd.page === page
          ? {
              ...pd,
              isSubmitted: true,
            }
          : pd,
      ),
    );

    const pageId = pageIds.find(item => item.page === page)?.pageId;
    if (pageId) {
      const saveData = {
        userId,
        cardPageId: pageId,
        userSubmission: userSubmission,
        isCorrect,
        duration,
      };

      await postUserSubmissionWithResult(saveData);
    }
  };

  const submitData = async (page: string, userSubmission: userSubmissionType[], duration = 0) => {
    setPageData(prevPageData =>
      prevPageData.map(pd =>
        pd.page === page
          ? {
              ...pd,
              isSubmitted: true,
            }
          : pd,
      ),
    );

    const pageId = pageIds.find(item => item.page === page)?.pageId;
    if (pageId) {
      const saveData = {
        userId,
        cardPageId: pageId,
        userSubmission: userSubmission,
        duration,
      };

      await postUserSubmission(saveData);
    }
  };

  const saveData = async (page: string, duration = 0) => {
    const currentPageData = pageDataRef.current.find(item => item.page === page);
    const pageId = pageIdsRef.current.find(item => item.page === page)?.pageId;
    if (!currentPageData?.isSubmitted && pageId && currentPageData?.userSubmission) {
      const saveData = {
        userId,
        cardPageId: pageId,
        userSubmission: currentPageData.userSubmission,
        duration,
      };
      await postUserSave(saveData);
    }
  };

  const clearData = () => {
    resetPageData();
    resetPageIds();
  };

  useEffect(() => {
    pageDataRef.current = pageData;
  }, [pageData]);

  useEffect(() => {
    pageIdsRef.current = pageIds;
  }, [pageIds]);

  return { initData, changeData, submitData, submitDataWithResult, saveData, clearData };
};

export default usePageData;
