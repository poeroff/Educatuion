import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import {
  IQuestionProps,
  Input,
  TD,
  InputStatus,
  EStyleButtonTypes,
  BoxWrap,
  Box,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TFoot,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { isNumber, isNotEmptyString, isAnswer, areArraysEqualIgnoringCaseAndWhitespace } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04_0004_06 } from './store';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04_0004_06);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const valueArray = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [[]];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '계산해 보세요.',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [['', '', ''], ['', '', ''], [''], ['']],
          isAnswer: true,
        },
      ],
    },
  ];

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (isNumber(value)) {
      const currentAnswer = Array.isArray(cardData.p01.answer) ? cardData.p01.answer : [];
      const newData = currentAnswer.map((row, rIndex) => (rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row));
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
      changeData('P01', 1, 1, newData);
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
    } else if (cardData.p01.answer.every(subArray => subArray.every(isNotEmptyString))) {
      const isCorrect = cardData.p01.answer.every((subArray, rowIndex) => {
        if (subArray.length !== cardData.p01.solution[rowIndex].length) {
          return false;
        }
        return areArraysEqualIgnoringCaseAndWhitespace(subArray, cardData.p01.solution[rowIndex]);
      });
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!valueArray.every(subArray => subArray.every(isNotEmptyString))}
      submitBtnColor={
        valueArray.every(subArray => subArray.every(isNotEmptyString))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.GRAY
      }
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['53', '×', '3']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>3</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer[0][2]}
                    onChange={event => handleChange(0, 2, event.target.value)}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][2])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][2], cardData.p01.solution[0][2])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={101}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[0][1]}
                    onChange={event => handleChange(0, 1, event.target.value)}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][1], cardData.p01.solution[0][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={102}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[0][0]}
                    onChange={event => handleChange(0, 0, event.target.value)}
                    ariaLabel='백의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[0][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[0][0], cardData.p01.solution[0][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={103}
                  />
                </TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>70 × 2 =</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[2][0]}
              onChange={event => handleChange(2, 0, event.target.value)}
              ariaLabel='70×2의 값'
              status={
                isNotEmptyString(cardData.p01.answer[2][0])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[2][0], cardData.p01.solution[2][0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p01.isSubmitted ? true : false}
              tabIndex={104}
            />
          </Box>
        </Box>

        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['21', '×', '5']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>1</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer[1][2]}
                    onChange={event => handleChange(1, 2, event.target.value)}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][2])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][2], cardData.p01.solution[1][2])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={105}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[1][1]}
                    onChange={event => handleChange(1, 1, event.target.value)}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][1])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][1], cardData.p01.solution[1][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={106}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[1][0]}
                    onChange={event => handleChange(1, 0, event.target.value)}
                    ariaLabel='백의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p01.answer[1][0])
                        ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[1][0], cardData.p01.solution[1][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={107}
                  />
                </TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>61 × 8 =</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[3][0]}
              onChange={event => handleChange(3, 0, event.target.value)}
              ariaLabel='61×8의 값'
              status={
                isNotEmptyString(cardData.p01.answer[3][0])
                  ? !cardData.p01.isSubmitted || isAnswer(cardData.p01.answer[3][0], cardData.p01.solution[3][0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              tabIndex={108}
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
            <Box marginTop='12px' gap={'20px'}>
              {cardData.p01.solution.map((item, index) => (
                <Typography key={index}>
                  {item.join(', ')}
                  {index !== cardData.p01.solution.length - 1 ? ',' : ''}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap flexWrap='wrap'>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['53', '×', '3']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>3</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>9</TD>
                      <TD>5</TD>
                      <TD>1</TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['21', '×', '5']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>0</TD>
                      <TD>1</TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' marginTop='20px' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['70', '×', '2']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>0</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>0</TD>
                      <TD>4</TD>
                      <TD>1</TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' marginTop='20px' marginRight='24px' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['61', '×', '8']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>1</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>8</TD>
                      <TD>8</TD>
                      <TD>4</TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
