import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box,
  Typography,
  EStyleFontSizes,
  TMainHeaderInfoTypes,
  Input,
  Button,
  EStyleButtonTypes,
  Dialog,
  SvgIcon,
  BottomSheet,
  IQuestionProps,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_icon from '@maidt-cntn/assets/icons/arrow-icon.svg';

import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C06A03 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (1)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q1. Fill in the blanks to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
      const isCorrect4 = isAnswer(cardData.p02.answer4, cardData.p02.solution4);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const truncatedValue = truncateToMaxBytes(value);
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        [`answer${subKey}`]: truncatedValue,
      },
    }));
    changeData('P02', 1, subKey, truncatedValue);
  };

  const handleDialogButtonClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      vAlign='flex-start'
      submitLabel={!cardData.p02.isSubmitted ? '채점하기' : isShow ? '답안 닫기' : '답안 보기'}
      onSubmit={submitAnswer}
      submitDisabled={
        !isNotEmptyString(cardData.p02.answer1) ||
        !isNotEmptyString(cardData.p02.answer2) ||
        !isNotEmptyString(cardData.p02.answer3) ||
        !isNotEmptyString(cardData.p02.answer4)
      }
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) ||
        !isNotEmptyString(cardData.p02.answer2) ||
        !isNotEmptyString(cardData.p02.answer3) ||
        !isNotEmptyString(cardData.p02.answer4)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='flex-end' vAlign='flex-start'>
        <Button
          tabIndex={101}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          style={{ height: '44px' }}
          minWidth='96px'
          useRound
          onClick={handleDialogButtonClick}
        />
      </Box>
      <Box background={'white'} useRound marginTop={'30px'} height={'230px'}>
        <Typography>Where can neural implants be inserted?</Typography>
        <Box hAlign='flex-start' vAlign={'center'}>
          <SvgIcon src={arrow_icon} size='34px' />
          <Typography>They can be inserted in the</Typography>
          <Input
            name='value1'
            maxLength={2000}
            value={cardData.p02.answer1}
            width='220px'
            readOnly={cardData.p02.isSubmitted}
            onChange={e => {
              handleChange(1, e.target.value);
            }}
            inputSize={'x-small'}
            status={
              !cardData.p02.answer1
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            placeholder={'내용을 넣어 주세요.'}
            ariaLabel='1번 답란'
          />
          <Input
            name='value2'
            maxLength={2000}
            value={cardData.p02.answer2}
            width='220px'
            marginLeft={10}
            readOnly={cardData.p02.isSubmitted}
            onChange={e => {
              handleChange(2, e.target.value);
            }}
            inputSize={'x-small'}
            status={
              !cardData.p02.answer2
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            placeholder={'내용을 넣어 주세요.'}
            ariaLabel='2번 답란'
          />
        </Box>
        <Box hAlign='flex' marginTop={'20px'}>
          <Typography>including the brain and</Typography>
          <Input
            name='value3'
            maxLength={2000}
            value={cardData.p02.answer3}
            width='220px'
            readOnly={cardData.p02.isSubmitted}
            onChange={e => {
              handleChange(3, e.target.value);
            }}
            inputSize={'x-small'}
            status={
              !cardData.p02.answer3
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer3, cardData.p02.solution3)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            placeholder={'내용을 넣어 주세요.'}
            ariaLabel='3번 답란'
          />
          <Input
            name='value4'
            maxLength={2000}
            value={cardData.p02.answer4}
            width='220px'
            readOnly={cardData.p02.isSubmitted}
            marginLeft={10}
            onChange={e => {
              handleChange(4, e.target.value);
            }}
            inputSize={'x-small'}
            status={
              !cardData.p02.answer4
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer4, cardData.p02.solution4)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            placeholder={'내용을 넣어 주세요.'}
            ariaLabel='4번 답란'
          />
          <Typography>.</Typography>
        </Box>
      </Box>

      <Dialog
        width={950}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} vAlign={'center'} useRound={true}>
            <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              Will AI-Powered Neural Implants Make Us Super-Humans? (1)
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        onClose={() => setIsDialogOpen(!isDialogOpen)}
        useFooter={true}
        closeLabel={'지문 닫기'}
        tabIndex={301}
      >
        <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
          Neuroscience has a long history of exploring treatments for disorders of the nervous system, including the brain and spinal cord.
          Traditionally, researchers have studied various functions of neural implants, which are medical devices like computer chips that can be
          implanted in the nervous system. But here’s the exciting part: with the rapid advancement of artificial intelligence (AI), researchers have
          begun to integrate AI into neural implants. In this post, we’ll examine the incredible benefits of AI-powered neural implants, their amazing
          potential for the future, and the ethical concerns surrounding them.
        </Typography>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px' height='48px' padding={8}>
            <Typography
              useGap={false}
              size={EStyleFontSizes.MEDIUM}
            >{`(1) ${cardData.p02.solution1}\n(2) ${cardData.p02.solution2}\n(3) ${cardData.p02.solution3}\n(4) ${cardData.p02.solution4}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
