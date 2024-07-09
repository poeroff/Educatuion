import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
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
  Input,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { textContentA02a, imgContentA02aP05 } from './commonData';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';

const P05 = () => {
  const { title, content } = textContentA02a;
  const { imgSrc, imgAlt } = imgContentA02aP05;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const [isMainTextOpen, setIsMainTextOpen] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string[]>(['', '']);
  const [isCorrect, setIsCorrect] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitCompleted, setSubmitCompleted] = useState(false); // submitDisabled과 반대 관계가 아님
  const [showAnswer, setShowAnswer] = useState(false); // 모범 답안

  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const answer: string[][] = [
    ['ertilizer', 'fertilizer'],
    ['abrics', 'fabrics'],
  ];

  const answerData: string[] = ['ertilizer (fertilizer도 정답 인정)', 'abrics (fabrics도 정답 인정)'];

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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputDatas = userSubmissionList[0].inputData.map((v: { value: string }) => v.value);
        setUserAnswer(inputDatas || userAnswer);
        setIsCorrect(userSubmissionList[0].isCorrect);
        setSubmitCompleted(isSubmitted);
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P05');
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
      const isCorrect = userAnswer.every((a, idx) => answer[idx].some(v => a.trim().toLowerCase() === v));
      if (isCorrect) {
        setIsCorrect(true);
      }

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          isCorrect: isCorrect,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: userAnswer[0],
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: userAnswer[1],
              isAnswer: true,
            },
          ],
        },
      ];
      submitDataWithResult('P05', userSubmission, isCorrect);

      setSubmitCompleted(true);
    } else {
      // 답안보기
      setShowAnswer(!showAnswer);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswer = [...userAnswer];
    newAnswer[index] = e.target.value;
    setUserAnswer([...newAnswer]);
    changeData('P05', 1, index + 1, newAnswer[index]);
  };

  useEffect(() => {
    const allAnswered = userAnswer.filter(a => a !== undefined && a !== '').length === answerData.length;
    if (allAnswered) {
      setSubmitDisabled(!allAnswered);
    }
  }, [userAnswer, answer.length]);

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
            <Image type={EImageType.IMG} src={imgSrc} alt={imgAlt} width='100%' />
          </PinchZoom>
        </Box>
        <Box marginLeft={'24px'} width={'70%'} height={'342px'} hAlign='center'>
          <Scroll>
            <Box display='flex' justifyContent='center'>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                food items
              </Typography>
            </Box>

            <Box marginTop={'20px'} hAlign='flex'>
              <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                7) f
              </Typography>
              <Input
                width='264px'
                value={userAnswer[0]}
                onChange={e => handleInputChange(e, 0)}
                status={
                  submitCompleted
                    ? !answer[0].some(v => userAnswer[0].trim().toLowerCase() === v)
                      ? InputStatus.ERROR
                      : InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                readOnly={submitCompleted}
                maxLength={100}
                aria-label='7번 답을 입력하세요'
                placeholder='내용을 넣어 주세요.'
              />
            </Box>

            <Box marginTop={'20px'} display='flex' justifyContent='center'>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                coffee logs
              </Typography>
            </Box>

            <Box marginTop={'20px'} hAlign='flex'>
              <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                8) f
              </Typography>
              <Input
                width='264px'
                value={userAnswer[1]}
                onChange={e => handleInputChange(e, 1)}
                status={
                  submitCompleted
                    ? !answer[1].some(v => userAnswer[1].trim().toLowerCase() === v)
                      ? InputStatus.ERROR
                      : InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                readOnly={submitCompleted}
                maxLength={100}
                aria-label='8번 답을 입력하세요'
                placeholder='내용을 넣어 주세요.'
              />
            </Box>

            <Box marginTop={'20px'} display='flex' justifyContent='center'>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                reusable cups
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>

      <Dialog width={893} height={458} isShow={isMainTextOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'260px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
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
              {answerData.map((elem, idx) => (
                <React.Fragment key={idx}>
                  ({idx + 7}) {elem}
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

export default P05;

const CustomButtonLabel = styled.span`
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  color: #6a6d73;
  line-height: 24px;
  white-space: nowrap;
`;
