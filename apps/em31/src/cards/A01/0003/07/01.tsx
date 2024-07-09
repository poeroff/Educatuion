import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  TMainHeaderInfoTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';

import { A01_0003_07 } from './store';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [cardData, setCardData] = useRecoilState(A01_0003_07);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const defaultSubmission: userSubmissionType[] = [
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
          type: 'TEXT_LIST',
          value: ['', '', ''],
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
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

  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: <>계산해 보세요.</>,
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const isNumber = (value: string) => {
    return /^\d*$/.test(value);
  };

  const setAnswer = (event: React.ChangeEvent<HTMLInputElement>, answerNo: number, answerIdx = -1) => {
    if (!isNumber(event.target.value)) {
      return;
    }

    const value = event.target.value;
    let answer: string | string[] = value;
    if (answerNo === 1) {
      setCardData(prev => {
        answer = [...prev.p01.answer1];
        answer[answerIdx] = value;
        return { ...prev, p01: { ...prev.p01, answer1: answer } };
      });
    } else if (answerNo === 2) {
      setCardData(prev => {
        answer = [...prev.p01.answer2];
        answer[answerIdx] = value;
        return { ...prev, p01: { ...prev.p01, answer2: answer } };
      });
    } else if (answerNo === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (answerNo === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    }

    changeData('P01', 1, answerNo, answer);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData.p01.isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(JSON.stringify(cardData.p01.answer1), JSON.stringify(cardData.p01.solution1));
    const isCorrect2 = isAnswer(JSON.stringify(cardData.p01.answer2), JSON.stringify(cardData.p01.solution2));
    const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
    const isCorrect4 = isAnswer(cardData.p01.answer4, cardData.p01.solution4);
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT_LIST',
            value: cardData.p01.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer4,
            isAnswer: true,
            isCorrect: isCorrect4,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const canSubmit = () => {
    return (
      cardData.p01.answer1.every((val: string) => val !== '') &&
      cardData.p01.answer2.every((val: string) => val !== '') &&
      cardData.p01.answer3 !== '' &&
      cardData.p01.answer4 !== ''
    );
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p01.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      onSubmit={onGrade}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['417', '+', '518']} />
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
                <TD>7</TD>
                <TD>1</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>1</TD>
                <TD>5</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer1[2]}
                    onChange={e => setAnswer(e, 1, 2)}
                    status={getStatus(cardData.p01.answer1[2], cardData.p01.solution1[2])}
                    title='일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer1[1]}
                    onChange={e => setAnswer(e, 1, 1)}
                    status={getStatus(cardData.p01.answer1[1], cardData.p01.solution1[1])}
                    title='십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer1[0]}
                    onChange={e => setAnswer(e, 1, 0)}
                    status={getStatus(cardData.p01.answer1[0], cardData.p01.solution1[0])}
                    title='백의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <MathExpression equation='$183+209=$' />
            <Input
              width='130px'
              value={cardData.p01.answer3}
              onChange={e => setAnswer(e, 3)}
              status={getStatus(cardData.p01.answer3, cardData.p01.solution3)}
              title='답 입력란'
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['675', '+', '190']} />
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
                <TD>5</TD>
                <TD>7</TD>
                <TD>6</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>0</TD>
                <TD>9</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer2[2]}
                    onChange={e => setAnswer(e, 2, 2)}
                    status={getStatus(cardData.p01.answer2[2], cardData.p01.solution2[2])}
                    title='일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer2[1]}
                    onChange={e => setAnswer(e, 2, 1)}
                    status={getStatus(cardData.p01.answer2[1], cardData.p01.solution2[1])}
                    title='십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer2[0]}
                    onChange={e => setAnswer(e, 2, 0)}
                    status={getStatus(cardData.p01.answer2[0], cardData.p01.solution2[0])}
                    title='백의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <MathExpression equation='$192+354=$' />
            <Input
              width='130px'
              value={cardData.p01.answer4}
              onChange={e => setAnswer(e, 4)}
              status={getStatus(cardData.p01.answer4, cardData.p01.solution4)}
              ariaLabel='답 입력란'
              readOnly={cardData.p01.isSubmitted}
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
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>9, 3, 5</Typography>
              <Typography>8, 6, 5</Typography>
              <Typography>392, 546</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['417', '+', '518']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>7</TD>
                      <TD>1</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>1</TD>
                      <TD>5</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD>9</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['675', '+', '190']} />
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
                      <TD>7</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>0</TD>
                      <TD>9</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>6</TD>
                      <TD>8</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box position='absolute' top='60px' left='210px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
              <Box position='absolute' top='60px' left='588px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            </BoxWrap>
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['183', '+', '209']} />
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
                      <TD>8</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD>0</TD>
                      <TD>2</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>9</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['192', '+', '354']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>2</TD>
                      <TD>9</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>4</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box position='absolute' top='290px' left='210px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
              <Box position='absolute' top='290px' left='588px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-pink-500)'>
                  1
                </Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
