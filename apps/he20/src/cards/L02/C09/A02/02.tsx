import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import HE02502, { ITextView } from '@maidt-cntn/pages/HE-025-02';
import { TMainHeaderInfoTypes, Box, Question, Typography, Input, InputStatus, EStyleFontSizes, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C09A02 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A02);
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read Jay’s request e-mail and answer the questions.',
    size: 'medium',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const wordArr = ['bank account', 'different ', 'refund', 'seen', 'shirt'];

  const { userId } = useRecoilValue(studentAtom);
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const results = checkAnswers(cardData.p02.answer, cardData.p02.solution);
    const isCorrect = results.every(result => result);
    setCardData(prev => ({
      ...prev,
      p02: { ...prev.p02, isSubmitted: true, isCorrect, answer: cardData.p02.answer, results: results },
    }));

    const submissionData: inputDatasType[] = cardData.p02.answer.map((answer, index) => {
      return {
        subKey: index + 1,
        type: 'TEXT',
        value: answer,
        isAnswer: true,
        isCorrect: results[index],
      };
    });
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: submissionData,
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData.map((item: inputDatasType) => item.value) || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            results: userSubmissionList[0].inputData.map((item: inputDatasType) => item.isCorrect),
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const answer = cardData.p02.answer.map((value, idx) => (idx === index ? event.target.value : value));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer } }));
    changeData('P02', 1, index + 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const textView: ITextView = {
    title: 'Purpose of the E-mail',
    text: 'I’m writing to request a full refund for the shirt I purchased from your website.',
    color: 'var(--color-yellow-200)',
    height: '70px',
  };

  const textViewNode = (
    <TextBoard color={textView.color}>
      <Box>
        <Typography size={EStyleFontSizes.MEDIUM} weight={'var(--font-weight-bold)'}>
          {textView.title}
        </Typography>
      </Box>
      <Box>
        <Scroll>
          <Typography>{textView.text}</Typography>
        </Scroll>
      </Box>
    </TextBoard>
  );

  const boxNode = (
    <>
      <Box hAlign='center'>
        <Typography weight={'var(--font-weight-bold)'}>Purpose of the E-mail</Typography>
      </Box>
      <Box display='flex'>
        <Typography useGap={false}>
          <Question size={'small'}>1.</Question>
        </Typography>
        <Typography weight={'var(--font-weight-bold)'}>What is the purpose of Jay’s e-mail?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>to request a full</Typography>
            <Input
              width='165px'
              value={cardData.p02.answer[0]}
              onChange={event => handleInputOnChange(event, 0)}
              ariaLabel='1번 답란'
              readOnly={cardData.p02.isSubmitted}
              status={
                cardData.p02.isSubmitted && !cardData.p02.results[0]
                  ? InputStatus.ERROR
                  : cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData.p02.answer[0])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              maxLength={12}
            />
            <Typography>for the</Typography>
            <Input
              width='122px'
              value={cardData.p02.answer[1]}
              onChange={event => handleInputOnChange(event, 1)}
              aria-label='2번 답란'
              readOnly={cardData.p02.isSubmitted}
              status={
                cardData.p02.isSubmitted && !cardData.p02.results[1]
                  ? InputStatus.ERROR
                  : cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData.p02.answer[1])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              maxLength={12}
            />
            <Typography>he purchased</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );

  return (
    <HE02502
      headerInfo={headerInfo}
      questionInfoProps={questionInfo}
      wordArr={wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={cardData.p02.solution}
      value={cardData.p02.answer}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={handleSubmit}
    />
  );
};

export default P02;
