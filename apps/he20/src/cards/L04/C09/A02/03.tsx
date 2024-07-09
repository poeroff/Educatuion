import HE02502, { ITextView } from '@maidt-cntn/pages/HE-025-02';
import { TMainHeaderInfoTypes, Box, Question, Typography, Input, Scroll, InputStatus, EStyleFontSizes, IQuestionProps } from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { TextBoard } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C09A02 } from './store';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean[]>([false, false]);

  const currentPage = 'P03';
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
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const textView: ITextView = {
    title: 'Supporting Details',
    text: 'To help you achieve this, let me make a few suggestions. First, you should be careful with your language online. Before you leave comments on others’ posts, consider whether or not your words might hurt their feelings. Protecting others’ privacy is also crucial. Avoid posting other people’s personal information on social media without their permission.',
    color: 'var(--color-green-300)',
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
        <Typography weight={700}>Supporting Details</Typography>
      </Box>
      <Scroll>
        <Box display='flex'>
          <Question size={'small'}>2.</Question>
          <Typography weight={700}>What should we do to achieve the skill?</Typography>
        </Box>
        <Box hAlign='center' vAlign='flex-start'>
          <Box paddingLeft='25px'>
            <Box>
              <Question type='dot' size='small'>
                <Typography>Be careful with</Typography>
              </Question>
              <Box paddingLeft='35px'>
                <Input
                  width='250px'
                  value={cardData.p03.answer[0]}
                  onChange={e => handleChange(0, e.target.value)}
                  placeholder='내용을 넣어 주세요.'
                  readOnly={cardData.p03.isSubmitted}
                  status={
                    isNotEmptyString(cardData.p03.answer[0])
                      ? !cardData.p03.isSubmitted || isAnswer(cardData.p03.answer[0], cardData.p03.solution[0])
                        ? InputStatus.ENABLE
                        : InputStatus.ERROR
                      : InputStatus.DEFAULT
                  }
                  inputSize={'x-small'}
                  ariaLabel='1번 답란'
                />
                <Typography>use.</Typography>
              </Box>
            </Box>
            <Box paddingLeft='25px'>
              <Typography>- Make sure your comments will </Typography>
              <Typography>not hurt others’</Typography>
              <Input
                width='210px'
                value={cardData.p03.answer[1]}
                onChange={e => handleChange(1, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p03.isSubmitted}
                status={
                  isNotEmptyString(cardData.p03.answer[1])
                    ? !cardData.p03.isSubmitted || isAnswer(cardData.p03.answer[1], cardData.p03.solution[1])
                      ? InputStatus.ENABLE
                      : InputStatus.ERROR
                    : InputStatus.DEFAULT
                }
                inputSize={'x-small'}
                ariaLabel='2번 답란'
              />
            </Box>
          </Box>
        </Box>
      </Scroll>
    </>
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p03.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    setCardData(prev => {
      const newAnswers = [...prev.p03.answer];
      newAnswers[index] = value;
      return {
        ...prev,
        p03: {
          ...prev.p03,
          answer: newAnswers,
        },
      };
    });
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      return;
    }
    const isCorrect = isAnswer(cardData.p03.answer[0], cardData.p03.solution) && isAnswer(cardData.p03.answer[1], cardData.p03.solution);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect: cardData.p03.isCorrect,
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
      wordArr={cardData.p03.wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={cardData.p03.solution}
      value={cardData.p03.answer}
      isSubmitted={cardData.p03.isSubmitted}
      onSubmit={check => {
        setDisabled(!disabled);
        setIsError(check);
        submitAnswer();
      }}
      boxWidth='750px'
    />
  );
};

export default P03;
