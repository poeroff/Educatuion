import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  Dropdown,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02b, imgContentA02bP03 } from './commonData';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue } from 'recoil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { title, content } = textContentA02b;
  const { imgSrc, imgAlt } = imgContentA02bP03;

  const dropArr1: string[] = ['fabrics', 'incinerated'];
  const dropArr2: string[] = ['methane', 'governments'];
  const dropAnswer: string[] = ['methane', 'incinerated'];

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitCompleted, setSubmitCompleted] = useState(false); // submitDisabled과 반대 관계가 아님
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: submitCompleted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setAnswer(userSubmissionList[0].inputData[0]?.value || answer);
        setSubmitCompleted(isSubmitted);
        setIsCorrect(userSubmissionList[0].isCorrect);
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const handleSubmit = () => {
    if (!submitCompleted) {
      // 채점하기
      const isCorrect = answer.every((a, idx) => a === dropAnswer[idx]);

      if (isCorrect) {
        setIsCorrect(true);
      }
      setSubmitCompleted(true);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          isCorrect: isCorrect,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));

    const newAnswer = [...answer];
    if (value !== undefined) {
      newAnswer[index - 1] = value;
    }
    setAnswer(newAnswer);

    changeData('P03', 1, 1, newAnswer);
  };

  useEffect(() => {
    const allAnswered = answer.filter(a => a !== undefined && a !== '').length === dropAnswer.length;
    if (allAnswered) {
      setSubmitDisabled(!allAnswered);
    }
  }, [answer, dropAnswer.length]);

  const getSubmitBtnColor = () => {
    if (!submitCompleted && submitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (!submitCompleted && !submitDisabled) {
      return EStyleButtonTypes.PRIMARY;
    } else if (submitCompleted && !showAnswer) {
      return EStyleButtonTypes.PRIMARY;
    } else if (submitCompleted && showAnswer) {
      return EStyleButtonTypes.DEFAULT;
    }
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getSubmitBtnColor()}
      submitLabel={submitCompleted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={submitDisabled}
      vAlign={'flex-start'}
    >
      <Box hAlign='flex-end' vAlign='flex-start' marginBottom='8px'>
        <Button width='96px' color={EStyleButtonTypes.TERTIARY} style={{ height: '44px' }} onClick={handleButtonClick}>
          <CustomButtonLabel>지문 보기</CustomButtonLabel>
        </Button>
      </Box>

      <BoxWrap>
        <Box width={'30%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgSrc} alt={imgAlt} height='410px' />
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          <Scroll>
            <Box>
              <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM} textDecoration={'underline'}>
                Buried
              </Typography>
            </Box>

            <Box marginTop={'20px'} display='inline-flex'>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                releasing
              </Typography>
            </Box>
            <span> </span>
            <Box hAlign='flex' display='inline-flex'>
              <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                3)
              </Typography>{' '}
              <Dropdown
                width='264px'
                selectedValue={answer[0]}
                dropdownList={dropArr2}
                isOpen={openDropdown[0]}
                ariaLabel='3번 답란'
                readOnly={submitCompleted}
                onClick={value => handleDropdownClick(1, value)}
                isError={submitCompleted ? answer[0] !== dropAnswer[0] : false}
              />
            </Box>
            <Box display='inline-flex'>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                : about
              </Typography>
            </Box>

            <Box>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                25 times more potent than CO2
              </Typography>
            </Box>

            <Box marginTop={'20px'} hAlign='flex'>
              <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                2)
              </Typography>{' '}
              <Dropdown
                width='264px'
                selectedValue={answer[1]}
                dropdownList={dropArr1}
                isOpen={openDropdown[1]}
                ariaLabel='2번 답란'
                readOnly={submitCompleted}
                onClick={value => handleDropdownClick(2, value)}
                isError={submitCompleted ? answer[1] !== dropAnswer[1] : false}
                type='up'
              />
            </Box>

            <Box marginTop={'20px'}>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                releasing CO2: 338 kg per ton
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog
        width={893}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
              {title}
            </Typography>
          </Box>
        )}
        isShow={isMainTextOpen}
        onClose={handleDialogClose}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        {content.split('\n').map((paragraph, index, arr) => (
          <React.Fragment key={index}>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
              {paragraph}
            </Typography>
            <br />
            {index !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Dialog>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'40%'}
        show={showAnswer}
        closeOption={{ useYn: true, onClose: () => setShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>
              {dropAnswer.map((elem, idx) => (
                <React.Fragment key={idx}>
                  ({idx + 2}) {elem}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
