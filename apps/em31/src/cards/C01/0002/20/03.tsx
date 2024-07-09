import { useState, useEffect } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  EStyleButtonTypes,
  BoxWrap,
  BottomSheet,
  ETagLine,
  Tag,
  IQuestionProps,
  Label,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TD,
  TFoot,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { C01_0002_20 } from '@/cards/C01/0002/20/store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const P03: React.FC = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0002_20);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: { ...prev.p03.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: { ...prev.p03.answer2, value } } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: { ...prev.p03.answer3, value } } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer4: { ...prev.p03.answer4, value } } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer5: { ...prev.p03.answer5, value } } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer6: { ...prev.p03.answer6, value } } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer7: { ...prev.p03.answer7, value } } }));
    } else if (subKey === 8) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer8: { ...prev.p03.answer8, value } } }));
    }
    changeData('P03', 1, subKey, value);
  };
  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSubmit = () => {
    const correct1 = cardData.p03.answer1.value.trim() === cardData.p03.answer1.solution;
    const correct2 = cardData.p03.answer2.value.trim() === cardData.p03.answer2.solution;
    const correct3 = cardData.p03.answer3.value.trim() === cardData.p03.answer3.solution;
    const correct4 = cardData.p03.answer4.value.trim() === cardData.p03.answer4.solution;
    const correct5 = cardData.p03.answer5.value.trim() === cardData.p03.answer5.solution;
    const correct6 = cardData.p03.answer6.value.trim() === cardData.p03.answer6.solution;
    const correct7 = cardData.p03.answer7.value.trim() === cardData.p03.answer7.solution;
    const correct8 = cardData.p03.answer8.value.trim() === cardData.p03.answer8.solution;
    const isAllCorrect = correct1 && correct2 && correct3 && correct4 && correct5 && correct6 && correct7 && correct8;
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer1: {
          ...cardData.p03.answer1,
          isCorrect: correct1,
        },
        answer2: {
          ...cardData.p03.answer2,
          isCorrect: correct2,
        },
        answer3: {
          ...cardData.p03.answer3,
          isCorrect: correct3,
        },
        answer4: {
          ...cardData.p03.answer4,
          isCorrect: correct4,
        },
        answer5: {
          ...cardData.p03.answer5,
          isCorrect: correct5,
        },
        answer6: {
          ...cardData.p03.answer6,
          isCorrect: correct6,
        },
        answer7: {
          ...cardData.p03.answer7,
          isCorrect: correct7,
        },
        answer8: {
          ...cardData.p03.answer8,
          isCorrect: correct8,
        },
        isSubmitted: true,
        isAllCorrect: isAllCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1.value,
            isCorrect: correct1,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer2.value,
            isCorrect: correct2,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer3.value,
            isCorrect: correct3,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer4.value,
            isCorrect: correct4,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer5.value,
            isCorrect: correct5,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer6.value,
            isCorrect: correct6,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer7.value,
            isCorrect: correct7,
          },
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer8.value,
            isCorrect: correct8,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isAllCorrect);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0] || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1] || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2] || cardData.p03.answer3,
            answer4: userSubmissionList[0].inputData[3] || cardData.p03.answer4,
            answer5: userSubmissionList[0].inputData[4] || cardData.p03.answer5,
            answer6: userSubmissionList[0].inputData[5] || cardData.p03.answer6,
            answer7: userSubmissionList[0].inputData[6] || cardData.p03.answer7,
            answer8: userSubmissionList[0].inputData[7] || cardData.p03.answer8,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        계산해 보세요.
      </>
    ),
    mark: cardData.p03.isSubmitted ? (cardData.p03.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p03.answer1.value &&
          cardData.p03.answer2.value &&
          cardData.p03.answer3.value &&
          cardData.p03.answer4.value &&
          cardData.p03.answer5.value &&
          cardData.p03.answer6.value &&
          cardData.p03.answer7.value &&
          cardData.p03.answer8.value
        )
      }
      submitBtnColor={
        !(
          cardData.p03.answer1.value &&
          cardData.p03.answer2.value &&
          cardData.p03.answer3.value &&
          cardData.p03.answer4.value &&
          cardData.p03.answer5.value &&
          cardData.p03.answer6.value &&
          cardData.p03.answer7.value &&
          cardData.p03.answer8.value
        )
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={cardData.p03.isSubmitted ? handleShowAnswer : handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['421', '+', '215']} />
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
                    value={cardData.p03.answer1.value}
                    status={cardData.p03.isSubmitted && !cardData.p03.answer1.isCorrect ? 'error' : ''}
                    onChange={e => handleChange(1, e.target.value)}
                    ariaLabel='1번 문제 일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p03.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p03.answer2.value}
                    status={cardData.p03.isSubmitted && !cardData.p03.answer2.isCorrect ? 'error' : ''}
                    onChange={e => handleChange(2, e.target.value)}
                    ariaLabel='1번 문제 십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p03.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p03.answer3.value}
                    status={cardData.p03.isSubmitted && !cardData.p03.answer3.isCorrect ? 'error' : ''}
                    onChange={e => handleChange(3, e.target.value)}
                    ariaLabel='1번 문제 백의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p03.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>271+126=</Typography>
            <Input
              width='130px'
              value={cardData.p03.answer4.value}
              status={cardData.p03.isSubmitted && !cardData.p03.answer4.isCorrect ? 'error' : ''}
              onChange={e => handleChange(4, e.target.value)}
              ariaLabel='271+126의 값'
              readOnly={cardData.p03.isSubmitted}
              maxLength={4}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['283', '+', '304']} />
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
                    value={cardData.p03.answer5.value}
                    status={cardData.p03.isSubmitted && !cardData.p03.answer5.isCorrect ? 'error' : ''}
                    onChange={e => handleChange(5, e.target.value)}
                    ariaLabel='2번 문제 일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p03.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p03.answer6.value}
                    status={cardData.p03.isSubmitted && !cardData.p03.answer6.isCorrect ? 'error' : ''}
                    onChange={e => handleChange(6, e.target.value)}
                    ariaLabel='2번 문제 십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p03.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p03.answer7.value}
                    status={cardData.p03.isSubmitted && !cardData.p03.answer7.isCorrect ? 'error' : ''}
                    onChange={e => handleChange(7, e.target.value)}
                    ariaLabel='2번 문제 백의 자리의 답'
                    maxLength={1}
                    readOnly={cardData.p03.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>561+401=</Typography>
            <Input
              width='130px'
              value={cardData.p03.answer8.value}
              status={cardData.p03.isSubmitted && !cardData.p03.answer8.isCorrect ? 'error' : ''}
              onChange={e => handleChange(8, e.target.value)}
              ariaLabel='561+401의 값'
              readOnly={cardData.p03.isSubmitted}
              maxLength={4}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={showAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShowAnswer(false);
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
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap display={'flex'} flexDirection={'column'}>
              <BoxWrap>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['421', '+', '215']} />
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
                    <TableMathCaption caption='세로셈' math={['283', '+', '304']} />
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
              <BoxWrap marginTop={'40px'}>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['271', '+', '126']} />
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
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['561', '+', '401']} />
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
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;