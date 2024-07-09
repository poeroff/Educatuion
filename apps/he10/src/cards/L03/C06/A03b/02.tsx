import { ChangeEvent, useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  IQuestionProps,
  Typography,
  SvgIcon,
  EStyleFontSizes,
  BottomSheet,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow from '@maidt-cntn/assets/icons/arrow-icon.svg';
import React from 'react';
import { isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C06A03b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const textContentA03 = {
  title: `Tuning Out: The Science of Noise-Cancellation (1)`,
  content: `Which is the better environment for studying: a noisy place or a quiet place? Rarely do people want to put up with a lot of noise because it can be unpleasant and distracting. Fortunately, scientists have invented noise-cancelling technology, which is now being used across various fields to reduce unwanted noise. What is the scientific principle behind this achievement? To understand this, let’s examine how sound travels.`,
  subTitleIndexes: new Set([1, 3, 5]),
};

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A03b);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P02';
  const pageKey = 'p02';

  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { title, content, subTitleIndexes } = textContentA03;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 3. Present and Share',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q1. Fill in the blanks to complete the sentences.',
  };

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const truncatedValue = truncateToMaxBytes(value);
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: truncatedValue,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.replace('value', '')), userInputs);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsAnswerOpen(!isAnswerOpen);
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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData[pageKey].answer.value2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData[pageKey].answer.value3,
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
            answer:
              {
                value1: userSubmissionList[0].inputData[0]?.value,
                value2: userSubmissionList[0].inputData[1]?.value,
                value3: userSubmissionList[0].inputData[2]?.value,
              } || cardData[pageKey].answer,
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
      vAlign={'flex-start'}
      submitBtnColor={isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={handleSubmit}
      submitDisabled={!cardData[pageKey].answer && !cardData[pageKey].isSubmitted}
      submitLabel={cardData[pageKey].isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
    >
      <Box hAlign='flex-end' vAlign='flex-start'>
        <Button
          label={'지문 보기'}
          color={EStyleButtonTypes.SECONDARY}
          size={EStyleSizes['X-SMALL']}
          minWidth='132px'
          useRound
          onClick={handleDialogOpen}
        />
      </Box>
      <Box background={'white'} useRound marginTop={'20px'} height={'280px'}>
        <Typography useGap={false}>What are some examples of noise pollution, and how can we address them?</Typography>
        <Box hAlign='flex'>
          <SvgIcon src={arrow} size='34px' />
          <Input
            maxLength={10}
            name='value1'
            value={cardData[pageKey].answer.value1}
            width='244px'
            placeholder='내용을 넣어 주세요.'
            onChange={handleInputChangeEvent}
            ariaLabel='1번 답란'
            status={isNotEmptyString(cardData[pageKey].answer.value1) ? InputStatus.ENABLE : InputStatus.DEFAULT}
            readOnly={cardData[pageKey].isSubmitted}
          />
          <Typography>are/is noisy because of</Typography>
          <Input
            maxLength={10}
            name='value2'
            value={cardData[pageKey].answer.value2}
            width='244px'
            placeholder='내용을 넣어 주세요.'
            onChange={handleInputChangeEvent}
            ariaLabel='2번 답란'
            status={isNotEmptyString(cardData[pageKey].answer.value2) ? InputStatus.ENABLE : InputStatus.DEFAULT}
            readOnly={cardData[pageKey].isSubmitted}
          />
          <Typography>.</Typography>
        </Box>
        <Box marginTop={'10px'}>
          <Typography>However, we can</Typography>
          <Input
            maxLength={40}
            name='value3'
            value={cardData[pageKey].answer.value3}
            width='580px'
            placeholder='내용을 넣어 주세요.'
            onChange={handleInputChangeEvent}
            ariaLabel='3번 답란'
            status={isNotEmptyString(cardData[pageKey].answer.value3) ? InputStatus.ENABLE : InputStatus.DEFAULT}
            readOnly={cardData[pageKey].isSubmitted}
          />
          <Typography>.</Typography>
        </Box>
      </Box>

      <Dialog
        width={893}
        height={500}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              {title}
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
        tabIndex={101}
      >
        <Typography>
          {content.split('\n').map((paragraph, index, arr) => (
            <React.Fragment key={index}>
              <Typography
                useGap={false}
                weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'}
                size={EStyleFontSizes.MEDIUM}
                style={{ marginBottom: '20px' }}
              >
                {paragraph}
              </Typography>
              {index !== arr.length - 1}
            </React.Fragment>
          ))}
        </Typography>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              Highways
            </Typography>{' '}
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              are noisy because of
            </Typography>{' '}
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              cars,
            </Typography>{' '}
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              However we can
            </Typography>{' '}
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              put up some walls to reduce the noise.
            </Typography>{' '}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
