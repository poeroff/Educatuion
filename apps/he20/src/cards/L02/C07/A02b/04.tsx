import { L02C07A02b } from '@/cards/L02/C07/A02b/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  Dropdown,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imgContentA02P04, textContentA02 } from './commonData';

const P04 = () => {
  const { title, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P04;

  const dropArr1: string[] = ['cautious', 'documenting'];
  const dropAnswer: string[] = ['documenting'];

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitCompleted, setSubmitCompleted] = useState(false); // submitDisabled과 반대 관계가 아님
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A02b);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: submitCompleted ? (isCorrect ? 'correct' : 'incorrect') : undefined,
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
      ],
      isCorrect: false,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultAnswer = userSubmissionList[0].inputData[0]?.value || cardData.p04.answer;
        const defaultIsCorrect = userSubmissionList[0].isCorrect || cardData.p04.isCorrect;
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: defaultAnswer,
            isSubmitted,
            isCorrect: defaultIsCorrect,
          },
        }));

        if (defaultIsCorrect) {
          setIsCorrect(true);
        }
        if (isSubmitted) {
          setSubmitCompleted(true);
        }
        setAnswer([defaultAnswer]);
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    } else {
      if (cardData.p04.isCorrect) {
        setIsCorrect(true);
      }
      if (cardData.p04.isSubmitted) {
        setSubmitCompleted(true);
      }

      setAnswer([cardData.p04.answer ? cardData.p04.answer : '']);
    }
  };

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

      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitData('P04', userSubmission);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));

    const newAnswer = [...answer];
    if (value !== undefined) newAnswer[index - 1] = value;
    setAnswer(newAnswer);
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData('P04', 1, 1, value);
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

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

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
            <Image type={EImageType.IMG} src={imgSrc} alt={imgAlt} width='100%' height='100%' />
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          <Scroll>
            <Box display='flex' justifyContent='center'>
              <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                Society
              </Typography>
            </Box>
            <Box marginTop={'20px'} display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                • Researchers are
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false} weight={700}>
                {' '}
                3)
              </Typography>
              <Dropdown
                readOnly={submitCompleted}
                width='264px'
                selectedValue={cardData.p04.answer}
                isError={cardData.p04.isSubmitted && !cardData.p04.isCorrect}
                dropdownList={dropArr1}
                isOpen={openDropdown[0]}
                onClick={value => handleDropdownClick(1, value)}
              />
            </Box>
            <Box display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                &nbsp;&nbsp;&nbsp;the prevalence of dark patterns and
                <p>&nbsp;&nbsp;&nbsp;finding solutions.</p>
              </Typography>
            </Box>
            <Box>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                • There are increasing regulations that
                <p>&nbsp;&nbsp;&nbsp;ban dark patterns.</p>
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog width={893} height={458} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'270px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography
                  style={{ whiteSpace: 'pre-wrap' }}
                  weight={!subTitleIndexes.has(index) ? 'normal' : 'semi-bold'}
                  size={EStyleFontSizes.MEDIUM}
                >
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>

      <BottomSheet bottomSheetTargetId='container' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <BoxWrap>
            {dropAnswer.map((elem, idx) => (
              <Box marginTop='12px' marginLeft='12px' key={idx}>
                {idx + 3}) {elem}
              </Box>
            ))}
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
