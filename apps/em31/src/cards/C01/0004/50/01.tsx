import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TMarkType,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C01_0004_50 } from './store';

import headerIcon from '../../../../assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0004_50);

  const answers = ['640', '1302', '832', '1451'];
  const [showAnswer, setShowAnswer] = useState(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {};

  const isAnswer1Correct = useMemo(() => cardData.p01.input1.join('') === answers[0], [answers, cardData.p01.input1]);
  const isAnswer2Correct = useMemo(() => cardData.p01.input2.join('') === answers[1], [answers, cardData.p01.input2]);
  const isAnswer3Correct = useMemo(() => cardData.p01.input3.join('') === answers[2], [answers, cardData.p01.input3]);
  const isAnswer4Correct = useMemo(() => cardData.p01.input4.join('') === answers[3], [answers, cardData.p01.input4]);

  const isAllCorrect = useMemo(
    () => isAnswer1Correct && isAnswer2Correct && isAnswer3Correct && isAnswer4Correct,
    [isAnswer1Correct, isAnswer2Correct, isAnswer3Correct, isAnswer4Correct],
  );

  useEffect(() => {
    if (cardData.p01.isSubmitted) {
      setMark(isAllCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p01.isSubmitted, isAllCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark,
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        계산해 보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: [''],
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: [''],
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
            input1: userSubmissionList[0].inputData[0]?.value || cardData.p01.input1,
            input2: userSubmissionList[0].inputData[1]?.value || cardData.p01.input2,
            input3: userSubmissionList[0].inputData[2]?.value || cardData.p01.input3,
            input4: userSubmissionList[0].inputData[3]?.value || cardData.p01.input4,
            isSubmitted,
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

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isAllCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.input1,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 2,
            type: 'TEXT_LIST',
            value: cardData.p01.input2,
            isAnswer: true,
            isCorrect: isAnswer2Correct,
          },
          {
            subKey: 3,
            type: 'TEXT_LIST',
            value: cardData.p01.input3,
            isAnswer: true,
            isCorrect: isAnswer3Correct,
          },
          {
            subKey: 4,
            type: 'TEXT_LIST',
            value: cardData.p01.input4,
            isAnswer: true,
            isCorrect: isAnswer4Correct,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleListInputChange = (index: number, subKey: 1 | 2 | 3 | 4, e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = [...cardData.p01[`input${subKey}`]];
    newInput[index] = e.target.value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, [`input${subKey}`]: newInput } }));
    changeData('P01', 1, subKey, newInput);
  };

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.YELLOW;
  };

  const isInputComplete = useMemo(() => {
    return (
      cardData.p01.input1.every(value => value !== '') &&
      cardData.p01.input2.every(value => value !== '') &&
      cardData.p01.input3.every(value => value !== '') &&
      cardData.p01.input4.every(value => value !== '')
    );
  }, [cardData.p01.input1, cardData.p01.input2, cardData.p01.input3, cardData.p01.input4]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='flex-start'
      useRound
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['475', '+', '165']} />
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
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD>6</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input1[2]}
                    onChange={e => handleListInputChange(2, 1, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input1[2])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input1[2], answers[0][2])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input1[1]}
                    onChange={e => handleListInputChange(1, 1, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input1[1])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input1[1], answers[0][1])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input1[0]}
                    onChange={e => handleListInputChange(0, 1, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input1[0])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input1[0], answers[0][0])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>283+549 =</Typography>
            <Input
              type='number'
              width='130px'
              ariaLabel='283+549 의 값'
              maxLength={5}
              value={cardData.p01.input3[0]}
              onChange={e => handleListInputChange(0, 3, e)}
              status={
                !isNotEmptyString(cardData.p01.input3[0])
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input3[0], answers[2])
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>

        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['328', '+', '974']} />
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
                <TD>2</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>7</TD>
                <TD>9</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[3]}
                    onChange={e => handleListInputChange(3, 2, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input2[3])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input2[3], answers[1][3])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[2]}
                    onChange={e => handleListInputChange(2, 2, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input2[2])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input2[2], answers[1][2])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[1]}
                    onChange={e => handleListInputChange(1, 2, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input2[1])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input2[1], answers[1][1])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p01.input2[0]}
                    onChange={e => handleListInputChange(0, 2, e)}
                    status={
                      !isNotEmptyString(cardData.p01.input2[0])
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input2[0], answers[1][0])
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='천의 자리의 답'
                    maxLength={1}
                  />
                </TD>
              </TR>
            </TFoot>
          </Table>

          <Box marginTop='24px'>
            <Typography>657+794=</Typography>
            <Input
              type='number'
              width='130px'
              ariaLabel='657+794의 값'
              maxLength={5}
              value={cardData.p01.input4[0]}
              onChange={e => handleListInputChange(0, 4, e)}
              status={
                !isNotEmptyString(cardData.p01.input4[0])
                  ? InputStatus.DEFAULT
                  : cardData.p01.isSubmitted && !isAnswer(cardData.p01.input4[0], answers[3])
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p01.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>640, 1302, 832, 1451</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['475', '+', '165']} />
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
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>5</TD>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>4</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>5</TD>
                      <TD width='40px'>6</TD>
                      <TD width='40px'>1</TD>
                      <TD width='40px'>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>0</TD>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>6</TD>
                      <TD width='40px'></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['20%', '20%', '20%', '20%', '20%']}>
                  <TableMathCaption caption='세로셈' math={['328', '+', '974']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>천의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>8</TD>
                      <TD width='40px'>2</TD>
                      <TD width='40px'>3</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>9</TD>
                      <TD width='40px'>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>2</TD>
                      <TD width='40px'>0</TD>
                      <TD width='40px'>3</TD>
                      <TD width='40px'>1</TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
            <BoxWrap marginTop='66px'>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['283', '+', '549']} />
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
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>3</TD>
                      <TD width='40px'>8</TD>
                      <TD width='40px'>2</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>9</TD>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>5</TD>
                      <TD width='40px'>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>2</TD>
                      <TD width='40px'>3</TD>
                      <TD width='40px'>8</TD>
                      <TD width='40px'></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['20%', '20%', '20%', '20%']}>
                  <TableMathCaption caption='세로셈' math={['657', '+', '794']} />
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
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>5</TD>
                      <TD width='40px'>6</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>9</TD>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>1</TD>
                      <TD width='40px'>5</TD>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>1</TD>
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
