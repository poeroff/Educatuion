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
  InputStatus,
  Tag,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { B01_0002_60 } from './store';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01_0002_60);
  const [isShow, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer6: value } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer7: value } }));
    } else if (subKey === 8) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer8: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3.trim() === cardData.p02.solution3;
      const isCorrect4 = cardData.p02.answer4.trim() === cardData.p02.solution4;
      const isCorrect5 = cardData.p02.answer5.trim() === cardData.p02.solution5;
      const isCorrect6 = cardData.p02.answer6.trim() === cardData.p02.solution6;
      const isCorrect7 = cardData.p02.answer7.trim() === cardData.p02.solution7;
      const isCorrect8 = cardData.p02.answer8.trim() === cardData.p02.solution8;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7 && isCorrect8;
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
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p02.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p02.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
            {
              subKey: 7,
              type: 'TEXT',
              value: cardData.p02.answer7,
              isAnswer: true,
              isCorrect: isCorrect7,
            },
            {
              subKey: 8,
              type: 'TEXT',
              value: cardData.p02.answer8,
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
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p02.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p02.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p02.answer7,
            answer8: userSubmissionList[0].inputData[7]?.value || cardData.p02.answer8,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        계산해 보세요.
      </>
    ),
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p02.answer1 &&
          cardData.p02.answer2 &&
          cardData.p02.answer3 &&
          cardData.p02.answer4 &&
          cardData.p02.answer5 &&
          cardData.p02.answer6 &&
          cardData.p02.answer7 &&
          cardData.p02.answer8
        )
      }
      submitBtnColor={
        !(
          cardData.p02.answer1 &&
          cardData.p02.answer2 &&
          cardData.p02.answer3 &&
          cardData.p02.answer4 &&
          cardData.p02.answer5 &&
          cardData.p02.answer6 &&
          cardData.p02.answer7 &&
          cardData.p02.answer8
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={onGrade}
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
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
                <TD>1</TD>
                <TD>2</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>5</TD>
                <TD>1</TD>
                <TD>2</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    textAlign='start'
                    value={cardData.p02.answer3}
                    onChange={e => handleInputChangeEvent(3, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.answer3.trim() !== cardData.p02.solution3
                        ? InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    textAlign='start'
                    value={cardData.p02.answer2}
                    onChange={e => handleInputChangeEvent(2, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.answer2.trim() !== cardData.p02.solution2
                        ? InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    textAlign='start'
                    value={cardData.p02.answer1}
                    onChange={e => handleInputChangeEvent(1, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.answer1.trim() !== cardData.p02.solution1
                        ? InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>271+126=</Typography>
            <Input
              type='number'
              width='130px'
              textAlign='start'
              value={cardData.p02.answer7}
              onChange={e => handleInputChangeEvent(7, e.target.value)}
              maxLength={3}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='271+126의 값'
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer7.trim() !== cardData.p02.solution7
                  ? InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
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
              <TR>
                <TD>3</TD>
                <TD>8</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>0</TD>
                <TD>3</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    textAlign='start'
                    value={cardData.p02.answer6}
                    onChange={e => handleInputChangeEvent(6, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.answer6.trim() !== cardData.p02.solution6
                        ? InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    textAlign='start'
                    value={cardData.p02.answer5}
                    onChange={e => handleInputChangeEvent(5, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.answer5.trim() !== cardData.p02.solution5
                        ? InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    textAlign='start'
                    value={cardData.p02.answer4}
                    onChange={e => handleInputChangeEvent(4, e.target.value)}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    status={
                      !cardData.p02.isSubmitted
                        ? InputStatus.ENABLE
                        : cardData.p02.answer4.trim() !== cardData.p02.solution4
                        ? InputStatus.ERROR
                        : InputStatus.DEFAULT
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>561+401=</Typography>
            <Input
              type='number'
              width='130px'
              textAlign='start'
              value={cardData.p02.answer8}
              onChange={e => handleInputChangeEvent(8, e.target.value)}
              maxLength={3}
              readOnly={cardData.p02.isSubmitted}
              ariaLabel='561+401의 값'
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer8.trim() !== cardData.p02.solution8
                  ? InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
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
              <Typography>636, 587, 397, 962</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='30px'>
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
                    <TR>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>1</TD>
                      <TD>2</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>6</TD>
                      <TD>3</TD>
                      <TD>6</TD>
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
                    <TR>
                      <TD>3</TD>
                      <TD>8</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>0</TD>
                      <TD>3</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>7</TD>
                      <TD>8</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
            <BoxWrap marginTop={'30px'}>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['56', '-', '18']} />
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
                      <TD>7</TD>
                      <TD>2</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>2</TD>
                      <TD>1</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>7</TD>
                      <TD>9</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='flex-start' flexDirection='column' useRound useFull>
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
                    <TR>
                      <TD>1</TD>
                      <TD>6</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>1</TD>
                      <TD>0</TD>
                      <TD>4</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>6</TD>
                      <TD>9</TD>
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
