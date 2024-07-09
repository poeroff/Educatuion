import HE02502 from '@maidt-cntn/pages/HE-025-02';
import { Box, EStyleFontSizes, IQuestionProps, Input, InputStatus, Question, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { ChangeEventHandler, useEffect } from 'react';
import { TextBoard } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C09A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P05 = () => {
  const pageKey = 'p05';
  const pageNumber = 'P05';
  const [cardData, setCardData] = useRecoilState(L02C09A02);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

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

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
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
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the book review and answer the questions.',
    size: 'medium',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const wordArr = ['listening', 'restore', 'sing', 'traditions', 'Witi lhimaera'];

  const boxNode = (
    <>
      <Box display='flex'>
        <Question size={'small'}>4.</Question>
        <Typography weight='var(--font-weight-bold)'>How did Minho feel while reading that scene?</Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box paddingLeft='48px'>
          <Typography useGap={false}>He felt as if he were there </Typography>
          <Input
            inputSize='x-small'
            width='280px'
            value={cardData[pageKey].answer}
            onChange={handleInputOnChange}
            placeholder='내용을 넣어 주세요.'
            maxLength={20}
            ariaLabel='답란'
            readOnly={cardData[pageKey].isSubmitted}
            status={
              cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                ? InputStatus.ERROR
                : isNotEmptyString(cardData[pageKey].answer)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
          />
          <Typography useGap={false}> to them singing.</Typography>
        </Box>
      </Box>
    </>
  );

  const textViewNode = (
    <TextBoard color={'var(--color-yellow-200)'}>
      <Box>
        <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
          Personal Reflection
        </Typography>
      </Box>
      <Box>
        <Scroll height='245px'>
          <Typography useGap={false}>
            The most moving part is when Nani and his daughter sing together on their journey to Murupara to complete the{' '}
          </Typography>
          <Typography useGap={false} style={{ fontStyle: 'italic' }}>
            Whakapapa
          </Typography>
          <Typography useGap={false}>. Reading that</Typography>{' '}
          <Typography useGap={false}>scene, I felt as if I were there listening to them singing.</Typography>
        </Scroll>
      </Box>
    </TextBoard>
  );

  const textViewHeight = '70px';

  return (
    <HE02502
      headerInfo={headerInfo}
      questionInfoProps={questionInfo}
      wordArr={wordArr}
      boxNode={boxNode}
      answer={[cardData[pageKey].solution]}
      value={[cardData[pageKey].answer]}
      onSubmit={handleSubmit}
      boxWidth='750px'
      textViewNode={textViewNode}
      textViewHeight={textViewHeight}
      isSubmitted={cardData[pageKey].isSubmitted}
    />
  );
};

export default P05;
