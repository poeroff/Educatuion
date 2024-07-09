import HE03701SP from '@maidt-cntn/pages/HE-037-01-SP';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, IQuestionProps, List, Radio, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SCP0401 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const DEFAULT_PAGE_KEY = 'P14';

interface P14Props {
  pageKey?: string;
}

const P14 = ({ pageKey = DEFAULT_PAGE_KEY }: P14Props) => {
  const storeKey = DEFAULT_PAGE_KEY;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0401);
  const { userId } = useRecoilValue(studentAtom);
  const choices = ['do', 'does'];
  const wordNodes: React.ReactNode[] = [
    <Typography key={1} fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
      He
      <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-bold)' textDecoration={'underline'}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Typography>
      not play soccer.
    </Typography>,
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '어법 연습',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>빈칸에 들어갈 알맞은 단어를 골라 봅시다.</Typography>,
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer: userSubmissionList[0].inputData[0]?.value || prev[storeKey]?.answer,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[storeKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  const handleRadioClick = (index: number) => {
    if (cardData[storeKey].isSubmitted) return;
    setCardData(prev => ({
      ...prev,
      [storeKey]: {
        ...prev[storeKey],
        answer: choices?.[index],
      },
    }));
    changeData(pageKey, 1, 1, choices?.[index]);
  };

  const nodes: React.ReactNode[] = [
    <List
      align='horizontal'
      gap={24}
      data={choices}
      key='list'
      row={({ value, index = 0 }) => (
        <Box width='400px' textAlign='center'>
          <Radio
            type={'box'}
            align='vertical'
            name={'radio-group'}
            label={value}
            ariaLabel={value}
            value={value === cardData[storeKey].answer}
            onClick={() => handleRadioClick(index - 1)}
            readOnly={cardData[storeKey].isSubmitted}
            isError={cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect}
          >
            {value}
          </Radio>
        </Box>
      )}
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
      saveData(pageKey);
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
      wordNode={wordNodes}
      answers={cardData[storeKey].answer}
      nodes={nodes}
      solution={cardData[storeKey].solution}
      submitted={cardData[storeKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P14;
