import { useEffect, useMemo, useState } from 'react';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
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
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A01_0005_06 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

interface IVerticalSubtraction {
  minuend: number;
  subtrahend: number;
  answer: number;
}

interface IProblem {
  question: string;
  answer: number;
}

const P01 = () => {
  const pageNo = 'P01';

  const subtractions: IVerticalSubtraction[] = [
    {
      minuend: 876,
      subtrahend: 123,
      answer: 753,
    },
    {
      minuend: 524,
      subtrahend: 300,
      answer: 224,
    },
  ];

  const problems: IProblem[] = [
    {
      question: '753-101=',
      answer: 652,
    },
    {
      question: '375-275=',
      answer: 100,
    },
  ];

  const answer = ['7, 5, 3, 2, 2, 4', '652, 100'];

  const explanations: IVerticalSubtraction[][] = [
    [
      {
        minuend: 876,
        subtrahend: 123,
        answer: 753,
      },
      {
        minuend: 524,
        subtrahend: 300,
        answer: 224,
      },
    ],
    [
      {
        minuend: 753,
        subtrahend: 101,
        answer: 652,
      },
      {
        minuend: 375,
        subtrahend: 275,
        answer: 100,
      },
    ],
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0005_06);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const subtractionStatus = useMemo(
    () =>
      cardData.p01.subtractionAnswers.map((subRow, rowIdx) =>
        subRow.map((val, idx) =>
          isNotEmptyString(val)
            ? !cardData.p01.isSubmitted || isAnswer(val, [...cardData.p01.subtractionSolutions[rowIdx]].reverse()[idx])
              ? InputStatus.ENABLE
              : InputStatus.ERROR
            : InputStatus.DEFAULT,
        ),
      ),
    [cardData.p01.isSubmitted, cardData.p01.subtractionAnswers, cardData.p01.subtractionSolutions],
  );
  const problemStatus = useMemo(
    () =>
      cardData.p01.problemAnswers.map((val, idx) =>
        isNotEmptyString(val)
          ? !cardData.p01.isSubmitted || isAnswer(val, cardData.p01.problemSolutions[idx])
            ? InputStatus.ENABLE
            : InputStatus.ERROR
          : InputStatus.DEFAULT,
      ),
    [cardData.p01.isSubmitted, cardData.p01.problemAnswers, cardData.p01.problemSolutions],
  );

  const subtractionFilled = useMemo(
    () => cardData.p01.subtractionAnswers.every(subRow => subRow.every(val => isNotEmptyString(val))),
    [cardData.p01.subtractionAnswers],
  );
  const problemFilled = useMemo(() => cardData.p01.problemAnswers.every(val => isNotEmptyString(val)), [cardData.p01.problemAnswers]);
  const isAllFilled = useMemo(() => subtractionFilled && problemFilled, [subtractionFilled, problemFilled]);
  const mark = useMemo(
    () => (cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none'),
    [cardData.p01.isSubmitted, cardData.p01.isCorrect],
  );

  const submitBtnColor = useMemo(() => {
    if (cardData.p01.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    } else {
      return isAllFilled ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    }
  }, [cardData.p01.isSubmitted, isShowAnswer, isAllFilled]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '계산해 보세요.',
    mark: mark,
  };

  const tableHeaders = ['일의 자리', '십의 자리', '백의 자리', '연산 기호'];

  const defaultSubmission: userSubmissionType[] = useMemo(
    () => [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: ['', '', ''],
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
            type: 'TEXT_LIST',
            value: ['', '', ''],
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
    ],
    [],
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            subtractionAnswers: [
              userSubmissionList[0].inputData[0]?.value || cardData.p01.subtractionAnswers[0],
              userSubmissionList[0].inputData[2]?.value || cardData.p01.subtractionAnswers[1],
            ],
            problemAnswers: [
              userSubmissionList[0].inputData[1]?.value || cardData.p01.problemAnswers[0],
              userSubmissionList[0].inputData[3]?.value || cardData.p01.problemAnswers[1],
            ],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleChangeSubtractionInput = (value: string, index: number, idx: number) => {
    const newValues = cardData.p01.subtractionAnswers.map(sub => [...sub]);
    newValues[index][idx] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, subtractionAnswers: newValues } }));
    newValues.forEach((values, idx) => {
      changeData(pageNo, 1, 2 * idx + 1, values);
    });
  };

  const handleChangeProblemInput = (value: string, index: number) => {
    const newValues = [...cardData.p01.problemAnswers];
    newValues[index] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, problemAnswers: newValues } }));
    newValues.forEach((value, idx) => {
      changeData(pageNo, 1, 2 * idx + 2, value);
    });
  };

  const handleSubmit = () => {
    if (!cardData.p01.isSubmitted) {
      const subtractionMarkings = subtractions.map((sub, index) =>
        [...String(sub.answer)].reverse().map((ans, idx) => isAnswer(cardData.p01.subtractionAnswers[index][idx], ans)),
      );
      const problemMarkings = problems.map((prob, index) => isAnswer(cardData.p01.problemAnswers[index], String(prob.answer)));
      const isCorrect = subtractionMarkings.every(subRow => subRow.every(val => val)) && problemMarkings.every(val => val);

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.subtractionAnswers[0],
              isAnswer: true,
              isCorrect: subtractionMarkings[0].every(val => val),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.problemAnswers[0],
              isAnswer: true,
              isCorrect: problemMarkings[0],
            },
            {
              subKey: 3,
              type: 'TEXT_LIST',
              value: cardData.p01.subtractionAnswers[1],
              isAnswer: true,
              isCorrect: subtractionMarkings[1].every(val => val),
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.problemAnswers[1],
              isAnswer: true,
              isCorrect: problemMarkings[1],
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNo, userSubmission, isCorrect);
    } else {
      setShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      useRound
      vAlign='flex-start'
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p01.isSubmitted && !isAllFilled}
      submitBtnColor={submitBtnColor}
    >
      <BoxWrap height={'304px'}>
        {subtractions.map((sub, index) => (
          <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull key={`subtraction-${index + 1}`}>
            <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
              <TableMathCaption caption={`세로셈 ${index + 1}`} math={[String(sub.minuend), '-', String(sub.subtrahend)]} />
              <THead hidden>
                <TR>
                  {tableHeaders.map((header, idx) => (
                    <TH key={`subtraction-header-${index + 1}-${idx + 1}`} scope='col'>
                      {header}
                    </TH>
                  ))}
                </TR>
              </THead>
              <TBody>
                <TR>
                  {['', ...String(sub.minuend)].reverse().map((val, idx) => (
                    <TD key={`subtraction-minuend-${index + 1}-${idx + 1}`}>{val}</TD>
                  ))}
                </TR>
                <TR>
                  {['-', ...String(sub.subtrahend)].reverse().map((val, idx) => (
                    <TD key={`subtraction-subtrahend-${index + 1}-${idx + 1}`}>{val}</TD>
                  ))}
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  {cardData.p01.subtractionAnswers[index].map((value, idx) => (
                    <TD key={`subtraction-answer-${index + 1}-${idx + 1}`}>
                      <Input
                        type='number'
                        value={value}
                        onChange={event => handleChangeSubtractionInput(event.target.value, index, idx)}
                        maxLength={1}
                        ariaLabel={`${index + 1}번 세로셈의 ${tableHeaders[idx]}, 답`}
                        status={subtractionStatus[index][idx]}
                      />
                    </TD>
                  ))}
                  <TD></TD>
                </TR>
              </TFoot>
            </Table>
            <Box marginTop='44px'>
              <Typography>{problems[index].question}</Typography>
              <Input
                type='number'
                width='130px'
                value={cardData.p01.problemAnswers[index]}
                maxLength={4}
                onChange={event => handleChangeProblemInput(event.target.value, index)}
                ariaLabel={`${sub.minuend}-${sub.subtrahend}의 값`}
                status={problemStatus[index]}
              />
            </Box>
          </Box>
        ))}
      </BoxWrap>{' '}
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              {answer.map((ans, idx) => (
                <Typography key={`answer-${idx + 1}`}>{ans}</Typography>
              ))}
            </Box>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            {explanations.map((subRow, rowIdx) => (
              <BoxWrap marginTop='40px' key={`explanation-${rowIdx + 1}`} alignItems='flex-start'>
                {subRow.map((sub, colIdx) => (
                  <Box hAlign='center' flexDirection='column' useRound useFull key={`explanation-${rowIdx + 1}-${colIdx + 1}`}>
                    <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                      <TableMathCaption
                        caption={`세로셈 정답 ${rowIdx * subRow.length + colIdx + 1}`}
                        math={[String(sub.minuend), '-', String(sub.subtrahend)]}
                      />
                      <THead hidden>
                        <TR>
                          {tableHeaders.map((header, idx) => (
                            <TH key={`explanation-header-${idx + 1}`} scope='col'>
                              {header}
                            </TH>
                          ))}
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          {['', ...String(sub.minuend)].reverse().map((val, idx) => (
                            <TD key={`explanation-minuend-${rowIdx + 1}-${colIdx + 1}-${idx + 1}`}>{val}</TD>
                          ))}
                        </TR>
                        <TR>
                          {['-', ...String(sub.subtrahend)].reverse().map((val, idx) => (
                            <TD key={`explanation-subtrahend-${rowIdx + 1}-${colIdx + 1}-${idx + 1}`}>{val}</TD>
                          ))}
                        </TR>
                      </TBody>
                      <TFoot>
                        <TR>
                          {['', ...String(sub.answer)].reverse().map((val, idx) => (
                            <TD key={`explanation-answer-${rowIdx + 1}-${colIdx + 1}-${idx + 1}`}>{val}</TD>
                          ))}
                        </TR>
                      </TFoot>
                    </Table>
                  </Box>
                ))}
              </BoxWrap>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
