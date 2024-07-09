import { Box, BoxWrap, Input, InputStatus, IQuestionProps, SvgIcon, Typography } from '@maidt-cntn/ui';
import HE02202, { IContentList } from '@maidt-cntn/pages/HE-022-02-API';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L04C08A05b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P03 = () => {
  const pageNumber = 'P03';
  const pageKey = 'p03';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A05b);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: 0,
        },
      ],
    },
  ];
  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = truncateToMaxBytes(e.target.value);
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
    changeData(pageNumber, 1, 1, value);
  };
  const [isShow, setShow] = useState<boolean>(false);
  const submitAnswer = (isWrong: boolean[]) => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer.value1,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
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
            answer: { value1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer.value1 },
            isSubmitted,
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
  };
  const nodeData: IContentList[] = [
    {
      children: (
        <Box>
          <Typography weight={'var(--font-weight-extraBold)'}>3.</Typography>
          <Typography>The belief is widely accepted in many cultures. The belief is that </Typography>
          <Typography>honesty is the best policy.</Typography>
        </Box>
      ),
    },
    {
      children: (
        <BoxWrap flexDirection={'column'} marginTop={'10px'}>
          <Box display={'flex'} alignItems={'center'}>
            <SvgIcon src={arrowRight} size='36px' />
            <Input
              maxLength={2000}
              name={'value1'}
              value={cardData[pageKey].answer.value1}
              onChange={handleInputChangeEvent}
              ariaLabel={'답란'}
              placeholder='내용을 넣어 주세요.'
              minWidth='250px'
              readOnly={cardData[pageKey].isSubmitted}
              status={cardData[pageKey].isSubmitted || isNotEmptyString(cardData[pageKey].answer.value1) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              inputSize={'x-small'}
            />
            <Typography>honesty is the best policy is widely accepted</Typography>
          </Box>
          <Box>
            <Typography> in many cultures.</Typography>
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
      submitType={'complete'}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P03;
