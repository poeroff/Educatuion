import { useEffect, useMemo, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
  Dialog,
} from '@maidt-cntn/ui';

import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0001_05 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { checkAnswers, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import P05 from './05';

const P02 = () => {
  const pageKey = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A01_0001_05);
  const isAllFilled = useMemo(() => cardData[pageKey].answer.every(ans => ans), [cardData[pageKey].answer]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: Array(6)
        .fill('')
        .map((_, index) => ({
          subKey: index + 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        })),
      isListCorrect: cardData[pageKey].isListCorrect,
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData?.map((item: { value: string }) => item.value) || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isListCorrect: isSubmitted ? userSubmissionList[0].isListCorrect : cardData[pageKey].isListCorrect,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
      return;
    }

    const results = checkAnswers(cardData[pageKey].answer, cardData[pageKey].solution);
    const isCorrect = results.every(result => result);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect, isListCorrect: results } }));

    const inputData: inputDatasType[] = cardData[pageKey].answer.map((value, idx) => ({
      subKey: idx + 1,
      type: 'TEXT',
      value: value || '',
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: inputData,
        isCorrect: isCorrect,
        isListCorrect: results,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        덧셈을 해 보세요.
      </>
    ),
    size: 'medium',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const selectBtnColor = () => {
    return isAllFilled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.GRAY;
  };

  const handleInputChangeEvent = (value: string, index: number) => {
    const updatedAnswers = cardData[pageKey].answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: updatedAnswers,
      },
    }));
    changeData(pageKey, 1, index + 1, updatedAnswers[index]);
  };

  const checkStatus = (index: number) => {
    return cardData[pageKey].isSubmitted && !cardData[pageKey].isListCorrect[index]
      ? InputStatus.ERROR
      : isNotEmptyString(cardData[pageKey].answer[index])
      ? InputStatus.ENABLE
      : InputStatus.DEFAULT;
  };

  const renderSolution = (solution: string | string[]) => {
    if (typeof solution === 'string') {
      return solution
        .split('')
        .reverse()
        .map((ans, idx) => <TD key={idx}>{ans}</TD>);
    }
    return null;
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitBtnColor={selectBtnColor()}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageKey].isSubmitted && !isAllFilled}
      onSubmit={() => submitAnswer()}
      useLinkLabel={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setDialogOpen(!isDialogOpen);
      }}
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['24', '+', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>4</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData[pageKey].answer[1]}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 1);
                    }}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                    status={checkStatus(1)}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData[pageKey].answer[0]}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 0);
                    }}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                    status={checkStatus(0)}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>56+18=</Typography>
            <Input
              type='number'
              width='130px'
              value={cardData[pageKey].answer[4]}
              maxLength={4}
              onChange={e => {
                handleInputChangeEvent(e.target.value, 4);
              }}
              ariaLabel='56와 18의 더한 값'
              readOnly={cardData[pageKey].isSubmitted}
              status={checkStatus(4)}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['35', '-', '8']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>5</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD></TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData[pageKey].answer[3]}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 3);
                    }}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                    status={checkStatus(3)}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData[pageKey].answer[2]}
                    onChange={e => {
                      handleInputChangeEvent(e.target.value, 2);
                    }}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                    status={checkStatus(2)}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>61-29=</Typography>
            <Input
              type='number'
              width='130px'
              value={cardData[pageKey].answer[5]}
              maxLength={4}
              readOnly={cardData[pageKey].isSubmitted}
              onChange={e => {
                handleInputChangeEvent(e.target.value, 5);
              }}
              ariaLabel='61와 29의 뺀 값'
              status={checkStatus(5)}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>3,1, 2,7, 74, 32</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['24', '-', '7']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD></TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>{cardData[pageKey].solution[1]}</TD>
                      <TD>{cardData[pageKey].solution[0]}</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['35', '-', '8']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD isMathCheck>3</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD></TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>{cardData[pageKey].solution[3]}</TD>
                      <TD>{cardData[pageKey].solution[2]}</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['56', '+', '18']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      {renderSolution(cardData[pageKey].solution[4])}
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['61', '-', '29']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>1</TD>
                      <TD isMathCheck>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD>2</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      {renderSolution(cardData[pageKey].solution[5])}
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={isDialogOpen}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setDialogOpen(false);
          saveData('P05');
        }}
        onConfirm={() => {
          setDialogOpen(false);
        }}
      >
        <P05 />
      </Dialog>
    </Container>
  );
};

export default P02;
