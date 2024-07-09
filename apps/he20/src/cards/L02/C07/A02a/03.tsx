import { L02C07A02a } from '@/cards/L02/C07/A02a/store';
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
import { imgContentA02aP03, textContentA02a } from './commonData';

const P03 = () => {
  const { title, content, subTitleIndexes } = textContentA02a;
  const { imgSrc, imgAlt } = imgContentA02aP03;

  const dropAnswer: string[] = ['manipulate', 'unintended'];

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C07A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isError0, setIsError0] = useState<boolean>(false);
  const [isError1, setIsError1] = useState<boolean>(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
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
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const defaultCorrect = userSubmissionList[0].isCorrect || cardData.p03.isCorrect;
        const defaultAnswer1 = userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1;
        const defaultAnswer2 = userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2;
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: defaultAnswer1,
            answer2: defaultAnswer2,
            isSubmitted,
            isCorrect: defaultCorrect,
          },
        }));
        if (isSubmitted) {
          setSubmitDisabled(false);
          setIsCorrect(defaultCorrect);
          if (!defaultCorrect) {
            dropAnswer.map((val, idx) => {
              // 채점하기
              if (idx === 0) {
                if (defaultAnswer1 !== val && defaultAnswer1 !== val.slice(1)) {
                  setIsError0(true);
                }
              } else {
                if (defaultAnswer2 !== val && defaultAnswer2 !== val.slice(1)) {
                  setIsError1(true);
                }
              }
            });
          }
        } else {
          if (defaultAnswer1 && defaultAnswer2) {
            setSubmitDisabled(false);
          }
          setIsCorrect(false);
        }
      }

      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }

    if (cardData.p03.isSubmitted) {
      setSubmitDisabled(false);
      setIsCorrect(cardData.p03.isCorrect);
      if (!cardData.p03.isCorrect) {
        checkAnswer();
      }
    } else {
      if (cardData.p03.answer1 && cardData.p03.answer2) {
        setSubmitDisabled(false);
      }
      setIsCorrect(false);
    }
  };

  const checkAnswer = () => {
    let returnVal = true;
    dropAnswer.map((val, idx) => {
      // 채점하기
      if (cardData.p03[`answer${idx + 1}`] !== val && cardData.p03[`answer${idx + 1}`] !== val.slice(1)) {
        if (idx === 0) {
          setIsError0(true);
        } else {
          setIsError1(true);
        }
        returnVal = false;
      }
    });
    return returnVal;
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      const correct = checkAnswer();

      if (correct) {
        setIsCorrect(true);
      }

      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: correct } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
            },
          ],
          isCorrect: correct,
        },
      ];

      submitData('P03', userSubmission);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    init();
  }, [pageIds]);

  const getSubmitBtnColor = () => {
    if (!cardData.p03.isSubmitted && submitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (!cardData.p03.isSubmitted && !submitDisabled) {
      return EStyleButtonTypes.PRIMARY;
    } else if (cardData.p03.isSubmitted && !showAnswer) {
      return EStyleButtonTypes.PRIMARY;
    } else if (cardData.p03.isSubmitted && showAnswer) {
      return EStyleButtonTypes.DEFAULT;
    }
  };

  const handleAnswerText = (idx: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCardData(prev => {
      if (isNotEmptyString(value)) {
        if (idx === 1) {
          if (prev.p03.answer2) {
            setSubmitDisabled(false);
          }
        } else {
          if (prev.p03.answer1) {
            setSubmitDisabled(false);
          }
        }
      } else {
        setSubmitDisabled(true);
      }
      const _p03 = { ...prev.p03 };
      _p03[`answer${idx}`] = value;
      return { ...prev, p03: { ..._p03 } };
    });
    changeData('P03', 1, idx, value);
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getSubmitBtnColor()}
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
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
                Meaning
              </Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                Deceptive designs used on websites
              </Typography>
            </Box>
            <Box display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                and applications to
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false}> 2)</Typography>
              m
              <Input
                tabIndex={101}
                placeholder=''
                alt='내용을 넣어 주세요'
                value={cardData.p03.answer1}
                inputSize='x-small'
                maxLength={dropAnswer[0].length}
                status={
                  isError0
                    ? InputStatus.ERROR
                    : !isNotEmptyString(cardData.p03.answer1 ? cardData.p03.answer1 : '') || !cardData.p03.isSubmitted
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p03.isSubmitted}
                onChange={event => handleAnswerText(1, event)}
              />
            </Box>
            <Box marginTop={'20px'} display='inline-flex'>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                users into making
              </Typography>
            </Box>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false}> 3)</Typography>
              u
              <Input
                tabIndex={102}
                placeholder=''
                alt='내용을 넣어 주세요'
                value={cardData.p03.answer2}
                inputSize='x-small'
                maxLength={dropAnswer[1].length}
                status={
                  isError1
                    ? InputStatus.ERROR
                    : !isNotEmptyString(cardData.p03.answer2 ? cardData.p03.answer2 : '') || !cardData.p03.isSubmitted
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p03.isSubmitted}
                onChange={event => handleAnswerText(2, event)}
              />
            </Box>
            <Box>
              <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
                decisions
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
          {dropAnswer.map((elem, idx) => (
            <Box marginTop='12px' marginLeft='12px' key={idx}>
              {idx + 2}) {elem.slice(1)} ({elem}도 정답 인정)
            </Box>
          ))}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;