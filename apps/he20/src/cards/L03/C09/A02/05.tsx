import HE02502, { ITextView } from '@maidt-cntn/pages/HE-025-02';
import { TMainHeaderInfoTypes, IQuestionProps, Box, Question, Typography, Input, InputStatus, EStyleFontSizes, Scroll } from '@maidt-cntn/ui';
import { useState, useEffect, ChangeEventHandler } from 'react';
import { TextBoard } from '@maidt-cntn/ui/en';
import { isNotEmptyString, isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L03C09A02 } from './store';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';

const P05 = () => {
  const pageKey = 'p05';
  const pageNumber = 'P05';
  const [cardData, setCardData] = useRecoilState(L03C09A02);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [isShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
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
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: event.target.value } }));
    changeData(pageNumber, 1, 1, event.target.value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the short biography and answer the questions.',
    size: 'medium',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const wordArr = ['conductor', 'influential', 'interpreted', 'memorizing', 'modern', 'vision'];

  const textView: ITextView = {
    title: 'Achievements',
    text: 'His passion for music allowed him to interpret original scores faithfully, as shown in his performances of Beethoven’s and Verdi’s works. He also established a modern conducting style.',
    color: 'var(--color-green-200)',
    height: '90px',
  };

  const textViewNode = (
    <TextBoard color={textView.color}>
      <Box>
        <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
          {textView.title}
        </Typography>
      </Box>
      <Box>
        <Scroll height='210px'>
          <Typography>{textView.text}</Typography>
        </Scroll>
      </Box>
    </TextBoard>
  );

  const boxNode = (
    <>
      <Box hAlign='center'>
        <Typography weight='var(--font-weight-bold)'>Achievements</Typography>
      </Box>
      <Box display='flex'>
        <Question size={'small'}>
          <Typography weight='var(--font-weight-bold)'>4. What did he achieve?</Typography>
        </Question>
      </Box>
      <Box hAlign='center' vAlign='flex-start' paddingLeft='25px'>
        <Question size='small' type='dot'>
          <Typography useGap={false}>
            <Input
              width='230px'
              value={cardData[pageKey].answer}
              maxLength={33}
              onChange={handleInputOnChange}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답란'
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                  ? InputStatus.ERROR
                  : isNotEmptyString(cardData[pageKey].answer)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
            />
            {` Beethoven’s and Verdi’s original scores faithfully`}
          </Typography>
        </Question>
      </Box>
    </>
  );

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  return (
    <HE02502
      headerInfo={headerInfo}
      questionInfoProps={questionInfo}
      wordArr={wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={textView.height}
      answer={[cardData[pageKey].solution]}
      value={[cardData[pageKey].answer]}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P05;
