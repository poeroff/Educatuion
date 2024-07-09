import HE02502, { ITextView } from '@maidt-cntn/pages/HE-025-02';
import { TMainHeaderInfoTypes, Box, Question, Typography, Input, InputStatus, EStyleFontSizes, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { TextBoard } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C09A02 } from './store';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const currentPage = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C09A02);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the book review and answer the questions.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const textView: ITextView = {
    title: 'Opinion',
    text: 'In the 21st century, the development of digital literacy is essential for global citizens. I consider it particularly important to have good manners when communicating  online.',
    color: 'var(--color-yellow-300)',
    height: '70px',
  };

  const textViewNode = (
    <>
      <TextBoard color={textView.color}>
        <Box>
          <Typography size={EStyleFontSizes.MEDIUM} weight={700}>
            {textView.title}
          </Typography>
        </Box>
        <Box>
          <Scroll height='245px'>
            <Typography>{textView.text}</Typography>
          </Scroll>
        </Box>
      </TextBoard>
    </>
  );

  const boxNode = (
    <>
      <Box hAlign='center'>
        <Typography weight={700}>Opinion</Typography>
      </Box>
      <Box display='flex'>
        <Question size={'small'}>1.</Question>
        <Typography weight={700}>What digital literacy skill is most important?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>to have good</Typography>
            <Input
              width='210px'
              value={cardData.p02.answer[0]}
              onChange={e => {
                handleChange(0, e.target.value);
              }}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData.p02.isSubmitted}
              status={
                isNotEmptyString(cardData.p02.answer[0])
                  ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[0], cardData.p02.solution[0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              ariaLabel='답란'
            />
          </Box>
          <Typography>when communicating online</Typography>
        </Box>
      </Box>
    </>
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p02.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    setCardData(prev => {
      const newAnswers = [...prev.p02.answer];
      newAnswers[index] = value;
      return {
        ...prev,
        p02: {
          ...prev.p02,
          answer: newAnswers,
        },
      };
    });
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      return;
    }
    const isCorrect = isAnswer(cardData.p02.answer[0], cardData.p02.solution[0]);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: cardData.p02.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  return (
    <HE02502
      headerInfo={headerInfo}
      questionInfoProps={questionInfo}
      wordArr={cardData.p02.wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={cardData.p02.solution}
      value={cardData.p02.answer}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={check => {
        setDisabled(!disabled);
        setIsError(check[0]);
        submitAnswer();
      }}
    />
  );
};

export default P02;
