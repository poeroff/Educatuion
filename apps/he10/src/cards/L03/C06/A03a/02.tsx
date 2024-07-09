import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  Scroll,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  TextareaStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C06A03a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A03a);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P02';
  const pageKey = 'p02';

  const [isShow, setIsShow] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const answer = cardData[pageKey].answer || '';

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (1)',
  };
  const questionInfo = {
    text: 'Q1. What are some examples of noise pollution, and how can we address them?',
  };

  const content =
    'Which is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across various fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how sound travels.';

  const handleInputChangeEvent = (value: string) => {
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: truncatedValue } }));
    changeData(pageNumber, 1, 1, truncatedValue);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={isNotEmptyString(answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={handleSubmit}
      submitDisabled={!isNotEmptyString(answer)}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            value={answer}
            onChange={e => handleInputChangeEvent(e.target.value)}
            readOnly={cardData[pageKey].isSubmitted}
            width='100%'
            height='100%'
            placeholder='내용을 입력해 주세요.'
            ariaLabel='답란'
            status={isNotEmptyString(answer) ? TextareaStatus.ENABLE : TextareaStatus.DEFAULT}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              Highways are noisy because of cars, However we can put up some walls to reduce the noise.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
