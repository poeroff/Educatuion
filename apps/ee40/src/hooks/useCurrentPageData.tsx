import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getUserSubmission, postUserSubmissionWithResult, postUserSave, postUserSubmission } from '@maidt-cntn/api';
import { correctDataType, gradeType, initDataType, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { getStringToArrRegExr } from '@/utils/regExr';
import { arraysMatchRegardlessOrder } from '@/utils/arrMatch';
import {
  appropriateTime,
  currentPageGradeData,
  currentPageInputData,
  currentPageSubmittedData,
  currentPageTypeData,
  durationTimer,
  isRunningTimer,
  pageDataAtom,
  studentAtom,
  pageAtom,
  pageMetaAtom,
} from '@/stores';

export const useCurrentPageData = ({ initData, collectDatas }: { initData?: initDataType; collectDatas?: correctDataType[] }) => {
  const [currentPageInputStates, setCurrentPageInputStates] = useRecoilState(currentPageInputData);
  const setPageMeta = useSetRecoilState(pageMetaAtom);
  const setPageType = useSetRecoilState(currentPageTypeData);
  const [duration, setDuration] = useRecoilState(durationTimer);
  const setAppropriateTime = useSetRecoilState(appropriateTime);
  const [pageSubmitted, setPageSubmitted] = useRecoilState(currentPageSubmittedData);
  const [gradeList, setGradeList] = useRecoilState(currentPageGradeData);
  const setRunningTimer = useSetRecoilState(isRunningTimer);

  const { selectedPageId, pageIdList } = useRecoilValue(pageDataAtom);
  const { selectedPage } = useRecoilValue(pageAtom);
  const { userId } = useRecoilValue(studentAtom);

  const uploadPageData = useCallback(
    async (pageId: number) => {
      if (!pageId) return;
      const { userSubmissionList, appropriateTime, duration, isSubmitted, contentId, dflvSeCd, curriculumId, activeType, currentSeq, unitId } =
        await getUserSubmission(userId, pageId);

      const newPageMeta = {
        contentId,
        duration,
        appropriateTime,
        curriculumId,
        activeType,
        currentSeq,
        difficulty: dflvSeCd,
        unitId,
      };

      setPageMeta(newPageMeta);

      if (userSubmissionList.length > 0) {
        setCurrentPageInputStates(userSubmissionList);

        const graded = userSubmissionList.reduce((gradedList: gradeType[], list: userSubmissionType) => {
          if (list?.isCorrect !== undefined) {
            gradedList.push({ mainKey: list.mainKey, isCorrect: list.isCorrect, isListCorrect: list.isListCorrect });
          }
          return gradedList;
        }, []);
        setGradeList(graded);
      } else setGradeList([]);

      if (appropriateTime) {
        setAppropriateTime(appropriateTime);
        setDuration(duration);
        setRunningTimer(!isSubmitted);
      }
      if (isSubmitted !== undefined) setPageSubmitted(isSubmitted);
    },
    [userId, setCurrentPageInputStates, setAppropriateTime, setDuration, setRunningTimer, setGradeList, setPageSubmitted],
  );

  const changeInputData = useCallback(
    (mainKey: number, subKey: string, value: unknown) => {
      setCurrentPageInputStates(prevStates => {
        return prevStates.map(userSubmission => {
          if (userSubmission.mainKey === mainKey) {
            const updatedInputData = userSubmission.inputData.map((data: inputDatasType) => {
              if (data.subKey === subKey) return { ...data, value };
              return data;
            });
            return { ...userSubmission, inputData: updatedInputData };
          }
          return userSubmission;
        });
      });
    },
    [setCurrentPageInputStates],
  );

  const getValueInputData = useCallback(
    (mainKey: number, subKey: string) => {
      return (
        currentPageInputStates?.find(state => state.mainKey === mainKey)?.inputData.find((data: inputDatasType) => data.subKey === subKey)?.value ??
        ''
      );
    },
    [currentPageInputStates],
  );

  const isGradedProblem = useCallback(
    (mainKey: number) => {
      return gradeList?.some(state => state.mainKey === mainKey && state.isCorrect !== undefined);
    },
    [gradeList],
  );

  const isGradedPage = useCallback(() => {
    return gradeList.length > 0;
  }, [gradeList]);

  const isSubmittedInput = useCallback(
    (mainKey: number, subKey: string) => {
      return (
        currentPageInputStates
          ?.find(state => state.mainKey === mainKey)
          ?.inputData.some((data: inputDatasType) => data.subKey === subKey && data.isCorrect !== undefined) || pageSubmitted
      );
    },
    [currentPageInputStates, pageSubmitted],
  );

  const isDetailCorrect = useCallback(
    (mainKey: number, subKey: string, isInputDataTypeList?: boolean) => {
      const mainKeyData = currentPageInputStates?.find(state => state.mainKey === mainKey)?.inputData;
      const subKeyData = mainKeyData?.find(data => data.subKey === subKey);

      const isSubKeyCorrect = subKeyData?.isCorrect;
      const isSubKeyListCorrect = subKeyData?.isListCorrect;

      if (isInputDataTypeList) return isSubKeyListCorrect;
      return isSubKeyCorrect;
    },
    [currentPageInputStates],
  );

  const savePageData = useCallback(async () => {
    if (pageSubmitted) return;

    const saveData = {
      userId,
      cardPageId: selectedPageId,
      userSubmission: currentPageInputStates,
      duration,
    };

    await postUserSave(saveData);
  }, [currentPageInputStates, duration, selectedPageId, userId, pageSubmitted]);

  const submitPageData = useCallback(async () => {
    if (pageSubmitted) return;

    const saveData = {
      userId,
      cardPageId: selectedPageId,
      userSubmission: currentPageInputStates,
      duration,
    };

    await postUserSubmission(saveData);
    setRunningTimer(false);
    setPageSubmitted(true);
  }, [currentPageInputStates, duration, selectedPageId, userId, pageSubmitted, setRunningTimer, setPageSubmitted]);

  const gradeSubmitPageData = useCallback(async () => {
    const getGraded = async () => {
      const gradedList: gradeType[] = [];

      const handleData = (data: userSubmissionType) => {
        const correctItem = collectDatas?.find(item => item.mainKey === data.mainKey);

        if (!correctItem) return data;
        let correctDatas = correctItem?.inputDatas?.[0] as any[];
        let isListCorrect: boolean[] = [];

        const updatedInputData = data.inputData.map(input => {
          if (!input.isAnswer) return input;

          let isCorrect = false;

          if (data.include) {
            const correctValue = correctDatas.find(el => el.subKey === input.subKey)?.value as any[];
            const deleteIndex = correctValue.findIndex(el => el === input.value);
            const deleteValue = correctValue[deleteIndex];
            const newCorrectValue = correctValue.filter(el => el !== deleteValue);
            const newCorrectDatas = correctDatas.map(el => ({ ...el, value: newCorrectValue }));

            correctDatas = newCorrectDatas;
            const isCurrentCorrect = correctValue.includes(input.value);

            return { ...input, isCorrect: isCurrentCorrect };
          }

          correctItem.inputDatas?.some(correctInputData => {
            const correctMap = new Map(correctInputData.map(correctInput => [correctInput.subKey, correctInput.value]));
            const correctValue = correctMap.get(input.subKey as string);

            if ((Array.isArray(input.value) && input.order !== true) || input.type === 'TEXTAREA') {
              const inputValues = Array.isArray(input.value) ? input.value : getStringToArrRegExr(input.value as string);
              const result = arraysMatchRegardlessOrder(inputValues, correctValue as (string | number)[]);
              isCorrect = result.isAllCorrect;
              isListCorrect = result.keysMatch;
            } else isCorrect = input.value === correctValue;

            return { ...input, isCorrect, isListCorrect };
          });

          return { ...input, isCorrect, isListCorrect };
        });

        const isCorrectAll = updatedInputData.every(input => (input.isAnswer ? input.isCorrect : true));

        gradedList.push({ mainKey: data.mainKey, isCorrect: isCorrectAll, isListCorrect });

        return { ...data, inputData: updatedInputData, isCorrect: isCorrectAll };
      };

      const updateCurrentPageData = currentPageInputStates.map(handleData);
      setCurrentPageInputStates([...updateCurrentPageData]);
      setGradeList([...gradedList]);
      return { isCorrect: gradedList.every(grade => grade.isCorrect), updateData: updateCurrentPageData };
    };

    const { isCorrect, updateData } = await getGraded();

    const saveData = {
      userId,
      cardPageId: selectedPageId,
      userSubmission: updateData,
      duration,
      isCorrect,
    };

    await postUserSubmissionWithResult(saveData);
    setRunningTimer(false);
    setPageSubmitted(true);
  }, [
    currentPageInputStates,
    setCurrentPageInputStates,
    collectDatas,
    userId,
    selectedPageId,
    duration,
    setRunningTimer,
    setPageSubmitted,
    setGradeList,
  ]);

  const formatData = useCallback((data: correctDataType[]): string => {
    const hasMultipleKeys = data.length > 1;
    return data
      .map(item => {
        if (!item.inputDatas) {
          return hasMultipleKeys ? `(${item.mainKey}) No data` : 'No data';
        }
        const formattedStrings = item.inputDatas.map(inputArray => {
          return inputArray.map(input => input.value).join(', ');
        });

        if (formattedStrings.length > 1) {
          return hasMultipleKeys ? `(${Number(item.mainKey) + 1 ?? ''}) ${formattedStrings.join(' 또는 ')}` : `${formattedStrings.join(' 또는 ')}`;
        } else {
          return hasMultipleKeys ? `(${Number(item.mainKey) + 1 ?? ''}) ${formattedStrings[0]}` : `${formattedStrings[0]}`;
        }
      })
      .join('\n');
  }, []);

  useEffect(() => {
    if (initData !== undefined) {
      const { inputData, pageType } = initData;
      if (inputData) setCurrentPageInputStates([...inputData]);
      if (pageType) setPageType(pageType);
      // console.log('selectedPageId', selectedPageId);
      // uploadPageData(selectedPageId);
    }
  }, []);

  useEffect(() => {
    // console.log('selectedPageId selectedPage', selectedPageId, selectedPage);
    if (pageIdList[selectedPage - 1] !== selectedPageId || !selectedPageId) return;
    uploadPageData(selectedPageId);
  }, [selectedPageId]);

  return useMemo(
    () => ({
      currentPageInputStates,
      gradeList,
      getValueInputData,
      changeInputData,
      savePageData,
      submitPageData,
      gradeSubmitPageData,
      uploadPageData,
      isSubmittedInput,
      isDetailCorrect,
      pageSubmitted,
      isGradedProblem,
      isGradedPage,
      formatData,
    }),
    [
      currentPageInputStates,
      gradeList,
      getValueInputData,
      changeInputData,
      savePageData,
      submitPageData,
      gradeSubmitPageData,
      uploadPageData,
      isSubmittedInput,
      isDetailCorrect,
      pageSubmitted,
      isGradedProblem,
      isGradedPage,
      formatData,
    ],
  );
};

export default useCurrentPageData;
