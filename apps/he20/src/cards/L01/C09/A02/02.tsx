import { useEffect, useState, useMemo } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Typography,
  List,
  Question,
  EStyleFontSizes,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { TextBoard } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C09A02 } from './store';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const wordArr = ['daily items', 'depression', 'senior welfare', 'weekend'];
  const scriptText = 'I’d like to deliver everyday items to seniors who live alone and spend time with them.';

  const pageNumber = 'P02';
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A02);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p02.isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo = {
    text: 'Read the volunteer application and answer the questions.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = isAnswer(cardData.p02.answer, cardData.p02.solution);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
              isCorrect: isCorrect,
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    } else {
      setIsBottomSheetOpen(!isBottomSheetOpen);
    }
  };

  const handleInputChangeEvent = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getSubmitLabel = () => (cardData.p02.isSubmitted ? (isBottomSheetOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const getButtonColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !cardData.p02.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isBottomSheetOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={getSubmitLabel()}
      submitDisabled={!cardData.p02.answer && !cardData.p02.isSubmitted}
      submitBtnColor={getButtonColor()}
      onSubmit={() => handleSubmit()}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull>
          <TextBoard color={'var(--color-green-200)'}>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} weight={'var(--font-weight-bold)'}>
                Type of Work You Want to Do
              </Typography>
            </Box>
            <Box>
              <Typography>{scriptText}</Typography>
            </Box>
          </TextBoard>
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='5px' useFull>
          <Box hAlign='center' useFull>
            <Typography weight='var(--font-weight-bold)'>Type of work</Typography>
          </Box>
          <Box display='flex'>
            <Question size={'small'}>
              <Typography weight='var(--font-weight-bold)'>1. What kind of volunteer work would Mia like to do?</Typography>
            </Question>
          </Box>
          <Box hAlign='space-between' vAlign='flex-start'>
            <Box paddingLeft='18px'>
              <Typography>Deliver</Typography>
              <Input
                status={
                  !isNotEmptyString(cardData.p02.answer)
                    ? InputStatus.DEFAULT
                    : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer, cardData.p02.solution)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                width='228px'
                inputSize='x-small'
                maxLength={33}
                value={cardData.p02.answer}
                onChange={e => handleInputChangeEvent(e.target.value)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='답란'
              />
              <Typography>to seniors and spend time with them.</Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <Box marginTop='12px'>
        <TextView title='보기'>
          <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isBottomSheetOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p02.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
