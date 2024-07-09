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

const P05 = () => {
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
    mark: getMarking(cardData.p05.isSubmitted, cardData.p05.isCorrect),
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
    if (cardData.p05.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData.p05.answer, cardData.p05.solution);
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P05', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: event.target.value } }));
    changeData('P05', 1, 1, event.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P05');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const textView: ITextView = {
    title: 'Request Details',
    text: 'I would therefore like to request that you provide a full refund for the product to my Safe Bank account, 012-34-56789.',
    color: 'var(--color-blue-300)',
    height: '70px',
  };

  const textViewNode = (
    <TextBoard width='445px' color={textView.color}>
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
        <Typography weight={'var(--font-weight-bold)'}>Request Details</Typography>
      </Box>
      <Box display='flex'>
        <Typography useGap={false}>
          <Question size={'small'}>4.</Question>
        </Typography>
        <Typography weight={'var(--font-weight-bold)'}>How does he want to get the refund?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='25px'>
          <Box>
            <Typography>a full refund to his</Typography>
            <Input
              width='172px'
              value={cardData.p05.answer}
              onChange={handleInputOnChange}
              ariaLabel='답란'
              readOnly={cardData.p05.isSubmitted}
              status={
                cardData.p05.isSubmitted && !cardData.p05.isCorrect
                  ? InputStatus.ERROR
                  : cardData.p05.isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData.p05.answer[0])
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
              maxLength={12}
            />
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
      answer={[cardData.p05.solution]}
      value={[cardData.p05.answer]}
      isSubmitted={cardData.p05.isSubmitted}
      onSubmit={handleSubmit}
    />
  );
};

export default P05;
