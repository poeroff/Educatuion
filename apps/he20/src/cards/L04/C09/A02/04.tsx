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

const P04 = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean[]>([false, false]);

  const currentPage = 'P04';
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
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const textView: ITextView = {
    title: 'Supporting Details',
    text: 'To help you achieve this, let me make a few suggestions. First, you should be careful with your language online. Before you leave comments on others’ posts, consider whether or not your words might hurt their feelings. Protecting others’ privacy is also crucial. Avoid posting other people’s personal information on social media without their permission.',
    color: 'var(--color-green-300)',
    height: '70px',
  };

  const textViewNode = (
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
            <Box hAlign={'center'}>
              <Question type='dot' size='small'>
                <Typography useGap={false}>Protect others’</Typography>
              </Question>
              <Input
                width='210px'
                value={cardData.p04.answer[0]}
                onChange={e => handleChange(0, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p04.isSubmitted}
                status={
                  isNotEmptyString(cardData.p04.answer[0])
                    ? !cardData.p04.isSubmitted || isAnswer(cardData.p04.answer[0], cardData.p04.solution[0])
                      ? InputStatus.ENABLE
                      : InputStatus.ERROR
                    : InputStatus.DEFAULT
                }
                inputSize={'x-small'}
                ariaLabel='1번 답란'
              />
            </Box>

            <Box paddingLeft='25px'>
              <Typography usePre useGap={false}>{`- Avoid posting others’ personal\n`}</Typography>
              <Typography>information without</Typography>
              <Input
                width='210px'
                value={cardData.p04.answer[1]}
                onChange={e => handleChange(1, e.target.value)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p04.isSubmitted}
                status={
                  isNotEmptyString(cardData.p04.answer[1])
                    ? !cardData.p04.isSubmitted || isAnswer(cardData.p04.answer[1], cardData.p04.solution[1])
                      ? InputStatus.ENABLE
                      : InputStatus.ERROR
                    : InputStatus.DEFAULT
                }
                inputSize={'x-small'}
                ariaLabel='1=2번 답란'
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
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p04.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    setCardData(prev => {
      const newAnswers = [...prev.p04.answer];
      newAnswers[index] = value;
      return {
        ...prev,
        p04: {
          ...prev.p04,
          answer: newAnswers,
        },
      };
    });
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      return;
    }
    const isCorrect = isAnswer(cardData.p04.answer[0], cardData.p04.solution) && isAnswer(cardData.p04.answer[1], cardData.p04.solution);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p04.answer,
            isAnswer: true,
            isCorrect: cardData.p04.isCorrect,
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
      wordArr={cardData.p04.wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={cardData.p04.solution}
      value={cardData.p04.answer}
      isSubmitted={cardData.p04.isSubmitted}
      onSubmit={check => {
        setDisabled(!disabled);
        setIsError(check);
        submitAnswer();
      }}
      boxWidth='750px'
    />
  );
};

export default P04;
