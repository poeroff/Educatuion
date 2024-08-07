import HE03701SP from '@maidt-cntn/pages/HE-037-01-SP';
import { useEffect, ChangeEvent } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, IQuestionProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SP03_1 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P05 = ({ pageNo = 'P05' }: { pageNo?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);
  const { userId } = useRecoilValue(studentAtom);
  const pageKey = 'p05';
  const word = '시작하다';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '단어 연습',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>다음 단어의 알맞은 영어 단어를 쓰세요.</Typography>,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || prev[pageKey]?.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (cardData[pageKey].isSubmitted) return;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: e.target.value,
      },
    }));
    changeData(pageNo, 1, 1, e.target.value);
  };

  const nodes: React.ReactNode[] = [
    <Box flex='1' textAlign='center' key={1}>
      <Input
        placeholder='내용을 넣어 주세요.'
        maxLength={cardData[pageKey].solution.length + 10}
        width='50%'
        status={
          cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
            ? InputStatus.ERROR
            : isNotEmptyString(cardData[pageKey].answer)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
        onChange={handleInputChangeEvent}
        value={cardData[pageKey].answer}
        readOnly={cardData[pageKey].isSubmitted}
        ariaLabel='답란'
      />
    </Box>,
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <HE03701SP
      questionInfo={questionInfo}
      headerInfo={headerInfo}
      word={word}
      answers={cardData[pageKey].answer}
      nodes={nodes}
      solution={cardData[pageKey].solution}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P05;
