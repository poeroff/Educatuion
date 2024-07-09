import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Input, Image, Typography, EStyleFontSizes, Scroll, InputStatus, IQuestionProps } from '@maidt-cntn/ui';
import { TextBoard } from '@maidt-cntn/ui/en';
import HE02502 from '@maidt-cntn/pages/HE-025-02';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03_C09_A02 } from '@/cards/L03/C09/A02/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P06 = () => {
  const pageNumber = 'P06';
  const pageKey = 'p06';
  const mainKey = 1;
  const subKey = 1;

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03_C09_A02);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: mainKey,
      inputData: [
        {
          subKey: subKey,
          type: 'TEXT',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, mainKey, subKey, userInputs);
  };
  const [isShow, setShow] = useState(false);
  const submitAnswer = (isWrong: boolean[]) => {
    const isCorrect = isWrong.every(item => !item);
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: mainKey,
          inputData: [
            {
              subKey: subKey,
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
    }
  };

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

  const questionInfoProps: IQuestionProps = {
    text: cardData.common.questionInfo.text,
    size: cardData.common.questionInfo.size,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const textViewNode = (
    <>
      <TextBoard color={cardData[pageKey].textView.color}>
        <Box>
          <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
            {cardData[pageKey].textView.title}
          </Typography>
        </Box>
        <Box>
          <Scroll height='180px'>
            <Typography>{cardData[pageKey].textView.text}</Typography>
          </Scroll>
        </Box>
      </TextBoard>
    </>
  );

  const boxNode = (
    <>
      <Box hAlign='center' flexDirection={'column'}>
        <Typography weight='var(--font-weight-bold)'>{cardData[pageKey].answerView.title}</Typography>
        <Typography weight='var(--font-weight-bold)' color={cardData[pageKey].answerView.color}>
          •{cardData[pageKey].answerView.subTitle}
        </Typography>
      </Box>
      <Box hAlign='center' vAlign='flex-start'>
        <Box marginLeft={'8px'}>
          <Image src={cardData[pageKey].answerView.imgSrc} alt={cardData[pageKey].answerView.imgAlt} size={'160px'} />
        </Box>
        <Box paddingLeft='25px'>
          <Box>
            <Typography useGap={false}>The colors will 5)</Typography>
            <Input
              width='210px'
              maxLength={20}
              name={'value1'}
              value={cardData[pageKey].answer.value1}
              onChange={handleInputChangeEvent}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답란'
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                  ? InputStatus.ERROR
                  : cardData[pageKey].isSubmitted
                  ? InputStatus.DEFAULT
                  : isNotEmptyString(cardData[pageKey].answer.value1)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
            />
          </Box>
          <Typography useGap={false}>all over the milk.</Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <HE02502
      headerInfo={cardData.common.headerInfo}
      questionInfoProps={questionInfoProps}
      wordArr={cardData.common.wordArr}
      boxNode={boxNode}
      textViewNode={textViewNode}
      textViewHeight={cardData[pageKey].textView.height}
      answer={[cardData[pageKey].solution.value1]}
      value={[cardData[pageKey].answer.value1]}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P06;
