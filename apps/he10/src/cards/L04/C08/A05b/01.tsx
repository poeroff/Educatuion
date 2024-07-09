import { Box, Input, InputStatus, IQuestionProps, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import arrowRight from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C08A05b } from '@/cards/L04/C08/A05b/store';
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
  const [cardData, setCardData] = useRecoilState(L04C08A05b);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 2: Practice',
  };

  const headerQuestion = {
    text: 'Place the given words in the correct order.',
  };

  const questionInfo: IQuestionProps = {
    text: headerQuestion?.text,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const problemInfo = {
    dialog: '1. 민수가 되고 싶은 것은 가수가 아니라 배우이다.',
    questions: ['What Minsu wants to be is '],
    candidates: ['not', 'but', 'a singer', 'an actor'],
    delimiter: ' / ',
  };

  const imageSrc = '/L04/C08/A05/HE1-L04-C08-A05-P01.jpg';

  const udl = [
    '이미지에는 문장이 퍼즐 조각처럼 나뉘어져 있다:',
    '첫 번째 조각: "Reusable cups"는 검은색으로 표시되어 있다.',
    '두 번째 조각: "not only"는 빨간색으로 강조되어 있다.',
    '세 번째 조각: "have an appealing appearance"는 "have"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
    '네 번째 조각: "but (also)"는 빨간색으로 강조되어 있다.',
    '다섯 번째 조각: "preserve the taste of the coffee."는 "preserve"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.',
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
    const value = e.target.value;
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
        <Box marginTop='20px'>
          <Typography>{problemInfo?.dialog}</Typography>
          <Box hAlign={'flex-start'} marginTop='10px'>
            <SvgIcon src={arrowRight} size='38px' />
            <Typography>{problemInfo?.questions[0]}</Typography>
            <Input
              value={cardData[pageKey].answer}
              onChange={handleChange}
              placeholder='내용을 넣어 주세요.'
              width={'auto'}
              maxLength={cardData[pageKey].solution.length + 10}
              readOnly={cardData[pageKey].isSubmitted}
              status={handleInputStatus(cardData[pageKey].answer, cardData[pageKey].solution)}
              inputSize={'x-small'}
              ariaLabel={'답란'}
            />
            <Typography>.</Typography>
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
