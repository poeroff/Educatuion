import HE03701SP from '@maidt-cntn/pages/HE-037-01-SP';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, IQuestionProps, Radio, TMainHeaderInfoTypes, Typography, List } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SP03_1 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = ({ pageNo = 'P03' }: { pageNo?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);
  const { userId } = useRecoilValue(studentAtom);
  const pageKey = 'p03';
  const choices = ['지우다', '환영하다', '사용하다'];
  const word = 'welcome';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '단어 연습',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>다음 단어의 알맞은 뜻을 고르세요.</Typography>,
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

  const handleRadioClick = (index: number) => {
    if (cardData[pageKey].isSubmitted) return;
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: choices?.[index],
      },
    }));
    changeData(pageNo, 1, 1, choices?.[index]);
  };

  const nodes: React.ReactNode[] = [
    <List
      align='horizontal'
      data={choices}
      gap={25}
      row={({ value, index = 1 }) => (
        <Box width='286px' textAlign='center'>
          <Radio
            type={'box'}
            align='vertical'
            name={'radio-question-A'}
            label={value}
            ariaLabel={value}
            value={value === cardData[pageKey].answer}
            onClick={() => handleRadioClick(index - 1)}
            isError={cardData[pageKey]?.isSubmitted && cardData[pageKey]?.answer !== cardData[pageKey]?.solution}
            readOnly={cardData[pageKey]?.isSubmitted}
          >
            {value}
          </Radio>
        </Box>
      )}
      key='list'
    />,
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
      choices={choices}
      word={word}
      answers={cardData[pageKey].answer}
      nodes={nodes}
      solution={cardData[pageKey].solution}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P03;
