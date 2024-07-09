import { Box, Input, InputStatus, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import React, { ChangeEvent, useEffect } from 'react';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C08A03 } from '@/cards/L04/C08/A03/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';

const P01 = () => {
  const pageNo = 'P01';
  const pageKey = 'p01';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A03);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: ' Write the given words in the correct order.',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const problemInfo = {
    question: '1. She finds',
    candidates: ['to learn', 'interesting', 'a second language', 'it'],
    delimiter: ' / ',
  };

  const imageSrc = '/L04/C08/A03/HE2-L04-C08-A03-P01.jpg';

  const udl = [
    '이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:',
    '첫 번째 조각: "Advances in neural implants will"',
    '두 번째 조각: "make" (파란색 글씨로 작성됨)',
    '세 번째 조각: "it"',
    '네 번째 조각: "possible"',
    '다섯 번째 조각: "to install" (빨간색 글씨로 작성됨)',
    '여섯 번째 조각: "software in our brains."',
    '이 조각들이 합쳐져서 "Advances in neural implants will make it possible to install software in our brains."라는 문장이 된다.',
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: mainKey,
        inputData: [
          {
            subKey: subKey,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageNo, 1, 1, value);
  };

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData[pageKey].isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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

  const nodeData: IContentList[] = [
    {
      children: (
        <Box marginTop='24px'>
          <Box hAlign={'flex-start'} marginTop='10px'>
            <Typography>{problemInfo?.question}</Typography>
            <Input
              value={cardData[pageKey].answer}
              onChange={handleChange}
              placeholder='내용을 넣어 주세요.'
              width={'480px'}
              maxLength={cardData[pageKey].solution.length + 10}
              readOnly={cardData[pageKey].isSubmitted}
              status={handleInputStatus(cardData[pageKey].answer, cardData[pageKey].solution)}
              inputSize={'x-small'}
              ariaLabel={'답란'}
            />
          </Box>
        </Box>
      ),
    },
    {
      children: (
        <Box
          hAlign='flex-start'
          backgroundColor='var(--color-blue-50)'
          border='transparent'
          useRound
          height='48px'
          marginTop='24px'
          paddingLeft='20px'
        >
          <Typography color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
            제시어: {problemInfo?.candidates.join(problemInfo?.delimiter).toString()}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <HE02202
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageSrc={imageSrc}
      udl={udl}
      nodeData={nodeData}
      inputs={{ value1: cardData[pageKey].answer }}
      answer={{ value1: cardData[pageKey].solution }}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={check => {
        handleSubmit();
      }}
    />
  );
};

export default P01;
