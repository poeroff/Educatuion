import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import {
  IQuestionProps,
  Input,
  Label,
  TD,
  TMainHeaderInfoTypes,
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
} from '@maidt-cntn/ui';
import { isNumber, isNotEmptyString, isAnswer, areArraysEqualIgnoringCaseAndWhitespace } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C01_0006_20 } from './store';
import { Container } from '@maidt-cntn/ui/math';
const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(C01_0006_20);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const valueArray = Array.isArray(cardData.p02.answer) ? cardData.p02.answer : [[]];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        계산해 보세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (isNumber(value)) {
      const currentAnswer = Array.isArray(cardData.p02.answer) ? cardData.p02.answer : [];
      const newData = currentAnswer.map((row, rIndex) => (rIndex === rowIndex ? row.map((col, cIndex) => (cIndex === colIndex ? value : col)) : row));
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: newData } }));
      changeData('P02', 1, 1, newData);
    }
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
  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
    } else if (cardData.p02.answer.every(subArray => subArray.every(isNotEmptyString))) {
      const isCorrect = cardData.p02.answer.every((subArray, rowIndex) => {
        if (subArray.length !== cardData.p02.solution[rowIndex].length) {
          return false;
        }
        return areArraysEqualIgnoringCaseAndWhitespace(subArray, cardData.p02.solution[rowIndex]);
      });
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.answer,
              isAnswer: true,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['858', '-', '462']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>8</TD>
                <TD>5</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>2</TD>
                <TD>6</TD>
                <TD>4</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer[0][2]}
                    onChange={event => handleChange(0, 2, event.target.value)}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p02.answer[0][2])
                        ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[0][2], cardData.p02.solution[0][2])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={101}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer[0][1]}
                    onChange={event => handleChange(0, 1, event.target.value)}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p02.answer[0][1])
                        ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[0][1], cardData.p02.solution[0][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={102}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer[0][0]}
                    onChange={event => handleChange(0, 0, event.target.value)}
                    ariaLabel='백의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p02.answer[0][0])
                        ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[0][0], cardData.p02.solution[0][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={103}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='48px'>
            <Typography>615-264=</Typography>
            <Input
              type='number'
              width='130px'
              value={cardData.p02.answer[2][0]}
              onChange={event => handleChange(2, 0, event.target.value)}
              ariaLabel='615-264의 값'
              status={
                isNotEmptyString(cardData.p02.answer[2][0])
                  ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[2][0], cardData.p02.solution[2][0])
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
              readOnly={cardData.p02.isSubmitted ? true : false}
              tabIndex={104}
            />
          </Box>
        </Box>

        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['976', '-', '327']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>6</TD>
                <TD>7</TD>
                <TD>9</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD>2</TD>
                <TD>3</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer[1][2]}
                    onChange={event => handleChange(1, 2, event.target.value)}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p02.answer[1][2])
                        ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[1][2], cardData.p02.solution[1][2])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={105}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer[1][1]}
                    onChange={event => handleChange(1, 1, event.target.value)}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p02.answer[1][1])
                        ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[1][1], cardData.p02.solution[1][1])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={106}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer[1][0]}
                    onChange={event => handleChange(1, 0, event.target.value)}
                    ariaLabel='백의 자리의 값'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted ? true : false}
                    status={
                      isNotEmptyString(cardData.p02.answer[1][0])
                        ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[1][0], cardData.p02.solution[1][0])
                          ? InputStatus.ENABLE
                          : InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                    tabIndex={107}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='48px'>
            <Typography>773-349=</Typography>
            <Input
              type='number'
              width='130px'
              value={cardData.p02.answer[3][0]}
              onChange={event => handleChange(3, 0, event.target.value)}
              ariaLabel='773-349의 값'
              status={
                isNotEmptyString(cardData.p02.answer[3][0])
                  ? !cardData.p02.isSubmitted || isAnswer(cardData.p02.answer[3][0], cardData.p02.solution[3][0])
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
              {cardData.p02.solution.map((item, index) => (
                <Typography key={index}>
                  {item.join('')}
                  {index !== cardData.p02.solution.length - 1 ? ',' : ''}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap flexWrap='wrap'>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['858', '-', '462']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>10</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>5</TD>
                      <TD isMathCheck>8</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>4</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>9</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['976', '-', '327']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>6</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD isMathCheck>7</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>2</TD>
                      <TD>3</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>9</TD>
                      <TD>4</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['615', '-', '264']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>10</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>1</TD>
                      <TD isMathCheck>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>6</TD>
                      <TD>2</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>1</TD>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' flex='1 1 45%' marginRight='24px' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['773', '-', '349']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>6</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD isMathCheck>7</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD>4</TD>
                      <TD>3</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>4</TD>
                      <TD>2</TD>
                      <TD>4</TD>
                      <TD></TD>
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

export default P02;
