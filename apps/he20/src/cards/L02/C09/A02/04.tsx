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

const P04 = () => {
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
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
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
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p04.answer, cardData.p04.solution);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: event.target.value } }));
    changeData('P04', 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
        <Typography useGap={false}>
          <Question size={'small'}>3.</Question>
        </Typography>
        <Typography weight={'var(--font-weight-bold)'}>What does he think about the problem?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>He thinks he should’ve</Typography>
            <Input
              width='118px'
              value={cardData.p04.answer}
              onChange={handleInputOnChange}
              ariaLabel='답란'
              readOnly={cardData.p04.isSubmitted}
              status={
                cardData.p04.isSubmitted && !cardData.p04.isCorrect
                  ? InputStatus.ERROR
                  : cardData.p04.isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData.p04.answer[0])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              maxLength={12}
            />
            <Typography>it in person before buying.</Typography>
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
      answer={[cardData.p04.solution]}
      value={[cardData.p04.answer]}
      isSubmitted={cardData.p04.isSubmitted}
      onSubmit={handleSubmit}
    />
  );
};

export default P04;
