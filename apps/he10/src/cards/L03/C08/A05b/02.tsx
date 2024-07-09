import { Box, BoxWrap, Input, InputStatus, IQuestionProps, SvgIcon, Typography } from '@maidt-cntn/ui';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03_C08_A05b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const pageNumber = 'P02';
  const pageKey = 'p02';

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03_C08_A05b);
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
        {
          subKey: 2,
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
    changeData(pageNumber, 1, Number(name.replace('value', '')), value);
  };
  const [isShow, setShow] = useState(false);
  const submitAnswer = (isWrong: boolean[]) => {
    const isCorrect = isWrong.every(item => !item);
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          isSubmitted: true,
          isCorrect: {
            value1: !isWrong[0],
            value2: !isWrong[1],
          },
        },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer.value1,
              isAnswer: true,
              isCorrect: !isWrong[0],
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer.value2,
              isAnswer: true,
              isCorrect: !isWrong[1],
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
            answer: {
              value1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer.value1,
              value2: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].answer.value2,
            },
            isSubmitted,
            isCorrect: {
              value1: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
              value2: isSubmitted ? userSubmissionList[0].inputData[1]?.isCorrect : false,
            },
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
  const checkIsCorrect = (value: { [key: string]: boolean }) => {
    return Object.keys(value).every(key => value[key]);
  };
  const questionInfo: IQuestionProps = {
    text: cardData.common.questionInfo.text,
    size: cardData.common.questionInfo.size,
    mark: cardData[pageKey].isSubmitted ? (checkIsCorrect(cardData[pageKey].isCorrect) ? 'correct' : 'incorrect') : 'none',
  };
  const headerInfo = {
    headerText: cardData.common.headerInfo.headerText,
  };
  const nodeData: IContentList[] = [
    {
      children: (
        <Box>
          <Typography weight={'var(--font-weight-extraBold)'}>2.</Typography>
          <Typography>Individuals should be aware of the impact of misinformation on </Typography>
          <Typography>public opinion.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <BoxWrap flexDirection={'column'}>
          <Box display={'flex'} alignItems={'center'}>
            <SvgIcon src={arrowRight} size='36px' />
            <Typography>It is crucial for </Typography>
            <Input
              name={'value1'}
              value={cardData[pageKey].answer.value1}
              onChange={handleInputChangeEvent}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='1번 답란'
              maxLength={30}
              minWidth='250px'
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect.value1
                  ? InputStatus.ERROR
                  : cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey].answer.value1)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
            />
            <Typography>to</Typography>
            <Input
              name={'value2'}
              value={cardData[pageKey].answer.value2}
              onChange={handleInputChangeEvent}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='2번 답란'
              maxLength={30}
              minWidth='250px'
              readOnly={cardData[pageKey].isSubmitted}
              status={
                cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect.value2
                  ? InputStatus.ERROR
                  : cardData[pageKey].isSubmitted
                  ? InputStatus.ENABLE
                  : isNotEmptyString(cardData[pageKey].answer.value2)
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              inputSize={'x-small'}
            />
          </Box>
          <Box>
            <Typography>the impact of misinformation on public opinion.</Typography>
          </Box>
        </BoxWrap>
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
