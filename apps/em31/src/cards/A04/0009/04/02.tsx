import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { A04000904_Atom } from './store';

const P02 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [cardData, setCardData] = useRecoilState(A04000904_Atom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

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
        {
          subKey: 3,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
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

  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value='2' />
        계산해 보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (answerNo === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (answerNo === 3) {
      setCardData(prev => {
        answer = [...prev.p02.answer3];
        answer[answerIdx] = value;
        return { ...prev, p02: { ...prev.p02, answer3: answer } };
      });
    } else if (answerNo === 4) {
      setCardData(prev => {
        answer = [...prev.p02.answer4];
        answer[answerIdx] = value;
        return { ...prev, p02: { ...prev.p02, answer4: answer } };
      });
    }

    changeData('P02', 1, answerNo, answer);
  };

  const getStatus = (answer: string, solution: string) => {
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }

    const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
    const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
    const isCorrect3 = isAnswer(JSON.stringify(cardData.p02.answer3), JSON.stringify(cardData.p02.solution3));
    const isCorrect4 = isAnswer(JSON.stringify(cardData.p02.answer4), JSON.stringify(cardData.p02.solution4));

    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT_LIST',
            value: cardData.p02.answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT_LIST',
            value: cardData.p02.answer4,
            isAnswer: true,
            isCorrect: isCorrect4,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const canSubmit = () => {
    return (
      cardData.p02.answer1 !== '' &&
      cardData.p02.answer2 !== '' &&
      cardData.p02.answer3.every((val: string) => val !== '') &&
      cardData.p02.answer4.every((val: string) => val !== '')
    );
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p02.isSubmitted) {
      return !canSubmit() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return !isShow ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.GRAY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!canSubmit()}
      submitBtnColor={getSubmitBtnColor()}
      onSubmit={onGrade}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Box marginBottom='24px'>
            <Typography>20×3＝</Typography>
            <Input
              width='130px'
              type='number'
              value={cardData.p02.answer1}
              onChange={e => setAnswer(e, 1)}
              status={getStatus(cardData.p02.answer1, cardData.p02.solution1)}
              ariaLabel='20×3 답 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['41', '×', '5']} />
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
                <TD>1</TD>
                <TD>4</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD></TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answer3[2]}
                    type='number'
                    onChange={e => setAnswer(e, 3, 2)}
                    status={getStatus(cardData.p02.answer3[2], cardData.p02.solution3[2])}
                    ariaLabel='41×3 일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer3[1]}
                    type='number'
                    onChange={e => setAnswer(e, 3, 1)}
                    status={getStatus(cardData.p02.answer3[1], cardData.p02.solution3[1])}
                    ariaLabel='41×3 십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer3[0]}
                    type='number'
                    onChange={e => setAnswer(e, 3, 0)}
                    status={getStatus(cardData.p02.answer3[0], cardData.p02.solution3[0])}
                    ariaLabel='41×3 백의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Box marginBottom='24px'>
            <Typography>11×4＝</Typography>
            <Input
              width='130px'
              type='number'
              value={cardData.p02.answer2}
              onChange={e => setAnswer(e, 2)}
              status={getStatus(cardData.p02.answer2, cardData.p02.solution2)}
              ariaLabel='11×4 답 입력란'
              readOnly={cardData.p02.isSubmitted}
            />
          </Box>
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
                <TD>4</TD>
                <TD>5</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD></TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p02.answer4[2]}
                    type='number'
                    onChange={e => setAnswer(e, 4, 2)}
                    status={getStatus(cardData.p02.answer4[2], cardData.p02.solution4[2])}
                    ariaLabel='11×4 일의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer4[1]}
                    type='number'
                    onChange={e => setAnswer(e, 4, 1)}
                    status={getStatus(cardData.p02.answer4[1], cardData.p02.solution4[1])}
                    ariaLabel='11×4 십의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p02.answer4[0]}
                    type='number'
                    onChange={e => setAnswer(e, 4, 0)}
                    status={getStatus(cardData.p02.answer4[0], cardData.p02.solution4[0])}
                    ariaLabel='11×4 백의자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
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
              <Typography>60, 44,</Typography>
              <Typography>2, 0, 5, 1, 6, 2</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['20', '×', '3']} />
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
                      <TD>0</TD>
                      <TD>2</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD></TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>0</TD>
                      <TD>6</TD>
                      <TD></TD>
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
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD></TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>4</TD>
                      <TD>4</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box position='absolute' top='60px' left='210px'></Box>
            </BoxWrap>
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['183', '+', '209']} />
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
                      <TD>1</TD>
                      <TD>4</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD></TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>5</TD>
                      <TD>0</TD>
                      <TD>2</TD>
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
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR>
                      <TD>4</TD>
                      <TD>5</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD></TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box position='absolute' top='300px' left='639px'>
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

export default P02;
