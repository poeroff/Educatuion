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
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  PinchZoom,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imgContentA02aP02, textContentA02a } from './commonData';
import { L02C07A02a } from './store';

const P02 = () => {
  const { title, content, subTitleIndexes } = textContentA02a;
  const { imgSrc, imgAlt } = imgContentA02aP02;

  const dropAnswer = 'competition';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isError0, setIsError0] = useState<boolean>(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text',
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
        },
      ],
      isCorrect: false,
    },
  ];

  const handleButtonClick = () => {
    setIsMainTextOpen(true);
  };

  const handleDialogClose = () => {
    setIsMainTextOpen(false);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultCorrect = userSubmissionList[0].isCorrect || cardData.p02.isCorrect;
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: defaultCorrect,
          },
        }));
        if (isSubmitted) {
          setSubmitDisabled(false);
          setIsCorrect(defaultCorrect);
          if (!defaultCorrect) {
            checkAnswer();
          }
        }
      }

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }

    if (cardData.p02.isSubmitted) {
      setSubmitDisabled(false);
      setIsCorrect(cardData.p02.isCorrect);
      if (!cardData.p02.isCorrect) {
        checkAnswer();
      }
    }
  };

  const checkAnswer = () => {
    let correct = false;
    // 채점하기
    if (cardData.p02.answer !== dropAnswer && cardData.p02.answer !== dropAnswer.slice(1)) {
      setIsError0(true);
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
      correct = true;
    }

    return correct;
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      const correct = checkAnswer();

      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: correct } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
          isCorrect: correct,
        },
      ];

      submitData('P02', userSubmission);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

  const getSubmitBtnColor = () => {
    if (!cardData.p02.isSubmitted && submitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (!cardData.p02.isSubmitted && !submitDisabled) {
      return EStyleButtonTypes.PRIMARY;
    } else if (cardData.p02.isSubmitted && !showAnswer) {
      return EStyleButtonTypes.PRIMARY;
    } else if (cardData.p02.isSubmitted && showAnswer) {
      return EStyleButtonTypes.DEFAULT;
    }
  };

  const handleAnswerText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCardData(prev => {
      if (isNotEmptyString(value)) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
      return { ...prev, p02: { ...prev.p02, answer: value } };
    });
    changeData('P02', 1, 1, value);
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getSubmitBtnColor()}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
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
                Cause
              </Typography>
            </Box>
            <Box marginTop={'20px'} display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                The
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false}>1)</Typography>
              c
              <Input
                tabIndex={101}
                placeholder=''
                alt='내용을 넣어 주세요'
                value={cardData.p02.answer}
                inputSize='x-small'
                maxLength={dropAnswer.length}
                status={
                  isError0
                    ? InputStatus.ERROR
                    : !isNotEmptyString(cardData.p02.answer ? cardData.p02.answer : '') || !cardData.p02.isSubmitted
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p02.isSubmitted}
                onChange={handleAnswerText}
              />
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                in online markets
              </Typography>
            </Box>
            <Box>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                has increased, causing companies to use more deceptive methods.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog width={893} height={480} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
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
            <Box marginTop='12px' marginLeft='12px'>
              1) {dropAnswer.slice(1)} ({dropAnswer}도 정답 인정)
            </Box>
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
