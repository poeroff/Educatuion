import { Box, Input, InputStatus, IQuestionProps, SvgIcon, Typography } from '@maidt-cntn/ui';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04_C08_A05 } from '@/cards/L04/C08/A05/store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04_C08_A05);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
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
    changeData(pageNumber, 1, 1, userInputs);
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

  const headerInfo = {
    headerText: cardData.common.headerInfo.headerText,
  };
  const questionInfo: IQuestionProps = {
    text: cardData.common.questionInfo.text,
    size: cardData.common.questionInfo.size,
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const nodeData: IContentList[] = [
    {
      children: (
        <Box>
          <Typography>
            2. Andrew exercises regularly. He also maintains a healthy diet. <br />
            (not only ~ but also...)
          </Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box hAlign={'flex-start'} marginTop='10px'>
          <SvgIcon src={arrowRight} size='38px' />
          <Typography>Andrew </Typography>
          <Input
            maxLength={70}
            name={'value1'}
            value={cardData[pageKey].answer.value1}
            onChange={handleInputChangeEvent}
            ariaLabel={'답란'}
            placeholder='내용을 넣어 주세요.'
            minWidth='700px'
            readOnly={cardData[pageKey].isSubmitted}
            status={
              cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                ? InputStatus.ERROR
                : cardData[pageKey].isSubmitted
                ? InputStatus.ENABLE
                : isNotEmptyString(cardData[pageKey].answer.value1)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            inputSize={'x-small'}
          />
          <Typography>.</Typography>
        </Box>
      ),
    },
  ];
  return (
    <HE02202
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageSrc={cardData.common.imageSrc}
      udl={cardData.common.udl}
      nodeData={nodeData}
      inputs={cardData[pageKey].answer}
      answer={cardData[pageKey].solution}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P02;
