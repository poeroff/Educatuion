import HE03701SP from '@maidt-cntn/pages/HE-037-01-SP';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, IQuestionProps, List, Radio, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SCP0401 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P13 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0401);
  const { userId } = useRecoilValue(studentAtom);
  const pageKey = 'P13';
  const choices = ['am', 'are', 'is'];
  const wordNodes: React.ReactNode[] = [
    <Typography key={1} fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
      I
      <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-bold)' textDecoration={'underline'}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Typography>
      nervous.
    </Typography>,
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '어법 연습',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>빈칸에 들어갈 알맞은 단어를 골라 봅시다.</Typography>,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || prev[pageKey]?.answer,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
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
    submitDataWithResult(pageKey, userSubmission, isCorrect);
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
    changeData(pageKey, 1, 1, choices?.[index]);
  };

  const nodes: React.ReactNode[] = [
    <List
      align='horizontal'
      gap={24}
      data={choices}
      key='list'
      row={({ value, index = 0 }) => (
        <Box width='286px' textAlign='center'>
          <Radio
            type={'box'}
            align='vertical'
            name={'radio-group'}
            label={value}
            ariaLabel={value}
            value={value === cardData[pageKey].answer}
            onClick={() => handleRadioClick(index - 1)}
            readOnly={cardData[pageKey].isSubmitted}
            isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
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
      answers={cardData[pageKey].answer}
      nodes={nodes}
      solution={cardData[pageKey].solution}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P13;
