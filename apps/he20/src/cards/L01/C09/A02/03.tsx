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
  Scroll,
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

const P03 = () => {
  const wordArr = ['daily items', 'depression', 'senior welfare', 'weekend'];
  const scriptText =
    'I’m interested in the welfare of the elderly. One day, I saw on the news that there had been an increase in the number of elderly people suffering from depression. I felt really sorry for them, so I wanted to provide emotional support by spending some time with them.';

  const pageNumber = 'P03';
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
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p03.isCorrect,
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
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      const isCorrect = isAnswer(cardData.p03.answer, cardData.p03.solution);
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer,
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
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const getSubmitLabel = () => (cardData.p03.isSubmitted ? (isBottomSheetOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const getButtonColor = () => {
    if (!cardData.p03.isSubmitted) {
      return !cardData.p03.answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
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
      submitDisabled={!cardData.p03.answer && !cardData.p03.isSubmitted}
      submitBtnColor={getButtonColor()}
      onSubmit={() => handleSubmit()}
    >
      <BoxWrap height='calc(100% - 107px)'>
        <Box hAlign='center' useFull>
          <TextBoard color={'var(--color-yellow-200)'}>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
                Reasons for Volunteering
              </Typography>
            </Box>
            <Box height='180px'>
              <Scroll height='100%'>
                <Typography>{scriptText}</Typography>
              </Scroll>
            </Box>
          </TextBoard>
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='5px' useFull>
          <Box hAlign='center' useFull>
            <Typography weight='var(--font-weight-bold)'>Reasons for Volunteering</Typography>
          </Box>
          <Box display='flex'>
            <Question size={'small'}>
              <Typography weight='var(--font-weight-bold)'>2. What made her apply for the program?</Typography>
            </Question>
          </Box>
          <Box hAlign='space-between' vAlign='flex-start'>
            <Box paddingLeft='18px'>
              <Typography>The news about the increasing number of elderly people with</Typography>
              <Input
                status={
                  !isNotEmptyString(cardData.p03.answer)
                    ? InputStatus.DEFAULT
                    : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer, cardData.p03.solution)
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                width='228px'
                inputSize='x-small'
                maxLength={33}
                value={cardData.p03.answer}
                onChange={e => handleInputChangeEvent(e.target.value)}
                placeholder='내용을 넣어 주세요.'
                readOnly={cardData.p03.isSubmitted}
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
          <Box marginTop='12px'>{cardData.p03.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
