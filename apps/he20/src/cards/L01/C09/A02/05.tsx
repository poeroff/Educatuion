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

const P05 = () => {
  const wordArr = ['daily items', 'depression', 'senior welfare', 'weekend'];
  const scriptText = 'I’m available to volunteer any time during the weekend.';

  const pageNumber = 'P05';

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
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p05.isCorrect,
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
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleSubmit = () => {
    if (!cardData.p05.isSubmitted) {
      const isCorrect = isAnswer(cardData.p05.answer, cardData.p05.solution);
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer,
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
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getSubmitLabel = () => (cardData.p05.isSubmitted ? (isBottomSheetOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const getButtonColor = () => {
    if (!cardData.p05.isSubmitted) {
      return !cardData.p05.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
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
      submitDisabled={!cardData.p05.answer && !cardData.p05.isSubmitted}
      submitBtnColor={getButtonColor()}
      onSubmit={() => handleSubmit()}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull>
          <TextBoard color={'var(--color-purple-200)'}>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
                Available Time
              </Typography>
            </Box>
            <Box>
              <Typography>{scriptText}</Typography>
            </Box>
          </TextBoard>
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='5px' useFull>
          <Box hAlign='center' useFull>
            <Typography weight='var(--font-weight-bold)'>Expectations</Typography>
          </Box>
          <Box display='flex'>
            <Question size={'small'}>
              <Typography weight='var(--font-weight-bold)'>4. When is she available to volunteer?</Typography>
            </Question>
          </Box>
          <Box hAlign='space-between' vAlign='flex-start'>
            <Box paddingLeft='18px'>
              <Typography>Any time during the</Typography>
              <Input
                status={
                  !isNotEmptyString(cardData.p05.answer)
                    ? InputStatus.DEFAULT
                    : cardData.p05.isSubmitted && !isAnswer(cardData.p05.answer, cardData.p05.solution)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                width='228px'
                inputSize='x-small'
                maxLength={33}
                value={cardData.p05.answer}
                onChange={e => handleInputChangeEvent(e.target.value)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p05.isSubmitted}
                ariaLabel='답란'
              />
              <Typography>.</Typography>
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
          <Box marginTop='12px'>{cardData.p05.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
