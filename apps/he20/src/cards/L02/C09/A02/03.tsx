import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import HE02502, { ITextView } from '@maidt-cntn/pages/HE-025-02';
import { TMainHeaderInfoTypes, Box, Question, Typography, Input, InputStatus, EStyleFontSizes, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C09A02 } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
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
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p03.answer, cardData.p03.solution);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: event.target.value } }));
    changeData('P03', 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const textView: ITextView = {
    title: 'Description of the Issue',
    text: 'Unfortunately, the color of the shirt is very different from the photo on the website. I think that I should’ve seen it in person before buying.',
    color: 'var(--color-pink-300)',
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
        <Typography weight={'var(--font-weight-bold)'}>Description of the Issue</Typography>
      </Box>
      <Box display='flex'>
        <Question size={'small'}>2.</Question>
        <Typography weight={'var(--font-weight-bold)'}>What is the problem?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>The color of the shirt is very</Typography>
          </Box>
          <Box paddingLeft='15px'>
            <Input
              width='189px'
              value={cardData.p03.answer}
              onChange={handleInputOnChange}
              ariaLabel='답란'
              readOnly={cardData.p03.isSubmitted}
              status={
                cardData.p03.isSubmitted && !cardData.p03.isCorrect
                  ? InputStatus.ERROR
                  : cardData.p03.isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData.p03.answer[0])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              maxLength={12}
            />
            <Typography>from the photo.</Typography>
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
      answer={[cardData.p03.solution]}
      value={[cardData.p03.answer]}
      isSubmitted={cardData.p03.isSubmitted}
      onSubmit={handleSubmit}
    />
  );
};

export default P03;
