import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C01000320P } from './store';
import usePageData from '@/hooks/usePageData';
import { MathExpression } from '@maidt-cntn/ui/math';

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
  EStyleFontSizes,
} from '@maidt-cntn/ui';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000320P);

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 7,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
        {
          subKey: 8,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.P02.isSubmitted ? (cardData.P02.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        계산 해 보세요.
      </>
    ),
  };

  const onGrade = () => {
    if (cardData.P02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.P02.answer1.trim() === cardData.P02.solution1;
      const isCorrect2 = cardData.P02.answer2.trim() === cardData.P02.solution2;
      const isCorrect3 = cardData.P02.answer3.trim() === cardData.P02.solution3;
      const isCorrect4 = cardData.P02.answer4.trim() === cardData.P02.solution4;
      const isCorrect5 = cardData.P02.answer5.trim() === cardData.P02.solution5;
      const isCorrect6 = cardData.P02.answer6.trim() === cardData.P02.solution6;
      const isCorrect7 = cardData.P02.answer7.trim() === cardData.P02.solution7;
      const isCorrect8 = cardData.P02.answer8.trim() === cardData.P02.solution8;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7 && isCorrect8;
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.P02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: cardData.P02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'NUMBER',
              value: cardData.P02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'NUMBER',
              value: cardData.P02.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'NUMBER',
              value: cardData.P02.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'NUMBER',
              value: cardData.P02.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
            {
              subKey: 7,
              type: 'NUMBER',
              value: cardData.P02.answer7,
              isAnswer: true,
              isCorrect: isCorrect7,
            },
            {
              subKey: 8,
              type: 'NUMBER',
              value: cardData.P02.answer8,
              isAnswer: true,
              isCorrect: isCorrect8,
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
          P02: {
            ...prev.P02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.P02.answer3,
            answer4: userSubmissionList[0].inputData[4]?.value || cardData.P02.answer4,
            answer5: userSubmissionList[0].inputData[5]?.value || cardData.P02.answer5,
            answer6: userSubmissionList[0].inputData[6]?.value || cardData.P02.answer6,
            answer7: userSubmissionList[0].inputData[7]?.value || cardData.P02.answer7,
            answer8: userSubmissionList[0].inputData[8]?.value || cardData.P02.answer8,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer6: value } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer7: value } }));
    } else if (subKey === 8) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer8: value } }));
    }
    changeData('P02', 1, subKey, value);
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
      vAlign='flex-start'
      useRound
      onSubmit={onGrade}
      submitLabel={cardData.P02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.P02.answer1 &&
          cardData.P02.answer2 &&
          cardData.P02.answer3 &&
          cardData.P02.answer4 &&
          cardData.P02.answer5 &&
          cardData.P02.answer6 &&
          cardData.P02.answer7 &&
          cardData.P02.answer8
        )
      }
      submitBtnColor={
        !(
          cardData.P02.answer1 &&
          cardData.P02.answer2 &&
          cardData.P02.answer3 &&
          cardData.P02.answer4 &&
          cardData.P02.answer5 &&
          cardData.P02.answer6 &&
          cardData.P02.answer7 &&
          cardData.P02.answer8
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['135', '+', '307']} />
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
                <TD>3</TD>
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD>0</TD>
                <TD>3</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.P02.answer3}
                    onChange={event => handleChange(3, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.P02.isSubmitted}
                    status={cardData.P02.isSubmitted && cardData.P02.answer3.trim() !== cardData.P02.solution3 ? 'error' : ''}
                    ariaLabel='일의 자리의 답.'
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer2}
                    onChange={event => handleChange(2, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.P02.isSubmitted}
                    status={cardData.P02.isSubmitted && cardData.P02.answer2.trim() !== cardData.P02.solution2 ? 'error' : ''}
                    ariaLabel='십의 자리의 답.'
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer1}
                    onChange={event => handleChange(1, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.P02.isSubmitted}
                    status={cardData.P02.isSubmitted && cardData.P02.answer1.trim() !== cardData.P02.solution1 ? 'error' : ''}
                    ariaLabel='백의 자리의 답.'
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>
              <MathExpression equation={'$543+186=$'} />
            </Typography>
            <Input
              value={cardData.P02.answer7}
              onChange={event => handleChange(7, event.target.value)}
              maxLength={3}
              width='130px'
              readOnly={cardData.P02.isSubmitted}
              status={cardData.P02.isSubmitted && cardData.P02.answer7.trim() !== cardData.P02.solution7 ? 'error' : ''}
              ariaLabel='543+186의 값.'
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['482', '+', '194']} />
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
                <TD>2</TD>
                <TD>8</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>9</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.P02.answer6}
                    onChange={event => handleChange(6, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.P02.isSubmitted}
                    status={cardData.P02.isSubmitted && cardData.P02.answer6.trim() !== cardData.P02.solution6 ? 'error' : ''}
                    ariaLabel='일의 자리의 답.'
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer5}
                    onChange={event => handleChange(5, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.P02.isSubmitted}
                    status={cardData.P02.isSubmitted && cardData.P02.answer5.trim() !== cardData.P02.solution5 ? 'error' : ''}
                    ariaLabel='십의 자리의 답.'
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer4}
                    onChange={event => handleChange(4, event.target.value)}
                    maxLength={1}
                    readOnly={cardData.P02.isSubmitted}
                    status={cardData.P02.isSubmitted && cardData.P02.answer4.trim() !== cardData.P02.solution4 ? 'error' : ''}
                    ariaLabel='백의 자리의 답.'
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>
              <MathExpression equation={'$215+678=$'} />
            </Typography>
            <Input
              value={cardData.P02.answer8}
              onChange={event => handleChange(8, event.target.value)}
              maxLength={3}
              width='130px'
              readOnly={cardData.P02.isSubmitted}
              status={cardData.P02.isSubmitted && cardData.P02.answer8.trim() !== cardData.P02.solution8 ? 'error' : ''}
              ariaLabel='215+678의 값.'
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
              <Typography>442, 676, 729, 893</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' flexDirection='column' useRound useFull width={180}>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['135', '+', '307']} />
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
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>3</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>0</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'2'} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'4'} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'4'} onChange={() => {}} ariaLabel='백의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['482', '+', '194']} />
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
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
                      <TD>8</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>9</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'6'} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'7'} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'6'} onChange={() => {}} ariaLabel='백의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['543', '+', '186']} />
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
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD>4</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>8</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'9'} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'2'} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'7'} onChange={() => {}} ariaLabel='백의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['215', '+', '678']} />
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
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>8</TD>
                      <TD>7</TD>
                      <TD>6</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>
                        <Input value={'3'} onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'9'} onChange={() => {}} ariaLabel='십의 자리의 답' maxLength={1} readOnly />
                      </TD>
                      <TD>
                        <Input value={'8'} onChange={() => {}} ariaLabel='백의 자리의 답' maxLength={1} readOnly />
                      </TD>
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
