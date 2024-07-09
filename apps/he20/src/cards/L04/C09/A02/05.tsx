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

const P05 = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const currentPage = 'P05';
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
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const wordArr = ['feelings', 'language', 'manners', 'permission', 'privacy', 'respect'];

  const textView: ITextView = {
    title: 'Conclusion',
    text: 'To be responsible digital citizens, always remember the fact that we should respect others in any kind of online  activity.',
    color: 'var(--color-pink-300)',
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
        <Typography weight={700}>Conclusion</Typography>
      </Box>
      <Box display='flex'>
        <Question size={'small'}>3.</Question>
        <Typography weight={700}>What should we remember to be responsible digital citizens?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>We should</Typography>
            <Input
              width='280px'
              value={cardData.p05.answer[0]}
              onChange={e => handleChange(0, e.target.value)}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData.p05.isSubmitted}
              status={
                isNotEmptyString(cardData.p05.answer[0])
                  ? !cardData.p05.isSubmitted || isAnswer(cardData.p05.answer[0], cardData.p05.solution[0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              ariaLabel='답란'
            />
          </Box>
          <Typography>others in any kind of online activity.</Typography>
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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p05.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    setCardData(prev => {
      const newAnswers = [...prev.p05.answer];
      newAnswers[index] = value;
      return {
        ...prev,
        p05: {
          ...prev.p05,
          answer: newAnswers,
        },
      };
    });
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p05.isSubmitted) {
      return;
    }
    const isCorrect = isAnswer(cardData.p05.answer[0], cardData.p05.solution);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect: cardData.p05.isCorrect,
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
      wordArr={cardData.p05.wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={cardData.p05.solution}
      value={cardData.p05.answer}
      isSubmitted={cardData.p05.isSubmitted}
      onSubmit={check => {
        setDisabled(!disabled);
        setIsError(check[0]);
        submitAnswer();
      }}
      boxWidth='750px'
    />
  );
};

export default P05;
