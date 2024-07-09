import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { Box, BoxWrap, IQuestionProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentInfo } from './contentInfo';
import { L04C06A05 } from './store';

const P02 = () => {
  const pageNumber = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A05);
  const { userId } = useRecoilValue(studentAtom);

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
          isAnswer: false,
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
          [pageNumber]: {
            ...prev[pageNumber],
            userInput: [userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput[0]],
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const isCorrect = isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0]);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].userInput[0],
              isCorrect: isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0]),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput: [value] } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData[pageNumber].isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Plan B Was Great, Too! (2)',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks.',
    mark: getMarking(cardData[pageNumber].isSubmitted, isAnswer(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0])),
  };
  const answer = {
    value1: cardData[pageNumber].solution[0],
  };
  const content = (
    <>
      <Box>
        <Typography lineHeight={'48px'} color='var(--color-m-en-default)' fontWeight='var(--font-weight-bold)'>
          {contentInfo.P01.body[0]}
        </Typography>
        <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[1]}</Typography>
        <Typography lineHeight={'48px'}>&nbsp;&nbsp;{contentInfo.P01.body[2]}</Typography>
      </Box>
    </>
  );
  const customLeftDiv = (
    <>
      <Box useFull marginRight={'24px'} hAlign='center'>
        <BoxWrap flexDirection='column'>
          <Box>
            <Typography>Dad and I met Grandma at</Typography>
          </Box>
          <Box>
            <Typography>the</Typography>
            <Input
              width='calc(100% - 160px)'
              maxLength={100}
              placeholder='내용을 넣어주세요.'
              ariaLabel='답안 입력란'
              status={getStatus(cardData[pageNumber].userInput[0], cardData[pageNumber].solution[0])}
              onChange={e => {
                handleInputChange(e.target.value);
              }}
              value={cardData[pageNumber].userInput[0]}
              readOnly={cardData[pageNumber].isSubmitted}
            />
          </Box>
        </BoxWrap>
      </Box>
    </>
  );
  return (
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={content}
      inputs={{ value1: cardData[pageNumber].userInput[0] }}
      answer={answer}
      onInputChange={e => {
        handleInputChange(e.target.value);
      }}
      onSubmit={handleSubmit}
      isSubmitted={cardData[pageNumber].isSubmitted}
      customLeftDiv={customLeftDiv}
      submitType='marking'
    />
  );
};

export default P02;
