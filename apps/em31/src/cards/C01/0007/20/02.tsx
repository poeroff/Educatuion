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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { C01000720_store } from './store';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000720_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const pageKey = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.P02.isSubmitted ? (cardData.P02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
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
          value: ['', '', '', '', '', '', '', ''],
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChangeEvent = (value: string, index: number) => {
    setCardData(prev => {
      const newCardData = JSON.parse(JSON.stringify(prev));
      newCardData[pageKey].answer[index] = value;
      return newCardData;
    });
  };

  useEffect(() => {
    changeData(pageKey, 1, 1, cardData.P02.answer);
  }, [cardData.P02.answer]);

  const handleInputStatus = (userAnswer: string, correctAnswer: string): InputStatus => {
    return !isNotEmptyString(userAnswer)
      ? InputStatus.DEFAULT
      : cardData.P02.isSubmitted && !isAnswer(userAnswer, correctAnswer)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isCorrectFinally = (): boolean => {
    return cardData.P02.answer?.every((val, index) => isAnswer(val, cardData.P02.solution[index]));
  };

  const handleSubmit = () => {
    if (!cardData.P02.isSubmitted) {
      const isCorrect = isCorrectFinally();
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P02.answer,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageKey, userSubmission, isCorrect);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.P02.isSubmitted) {
      return !cardData.P02.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '채점하기');
  const isSubmitDisabled = () => !cardData.P02.answer?.every(val => val) && !cardData.P02.isSubmitted;

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitDisabled={isSubmitDisabled()}
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['691', '-', '394']} />
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
                <TD>9</TD>
                <TD>6</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>4</TD>
                <TD>9</TD>
                <TD>3</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.P02.answer[0]}
                    onChange={e => handleInputChangeEvent(e.target.value, 0)}
                    status={handleInputStatus(cardData.P02.answer[0], cardData.P02.solution[0])}
                    readOnly={cardData.P02.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer[1]}
                    onChange={e => handleInputChangeEvent(e.target.value, 1)}
                    status={handleInputStatus(cardData.P02.answer[1], cardData.P02.solution[1])}
                    readOnly={cardData.P02.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer[2]}
                    onChange={e => handleInputChangeEvent(e.target.value, 2)}
                    status={handleInputStatus(cardData.P02.answer[2], cardData.P02.solution[2])}
                    readOnly={cardData.P02.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>532-248 =</Typography>
            <Input
              width='130px'
              ariaLabel='532-248의 값'
              maxLength={5}
              value={cardData.P02.answer[3]}
              onChange={e => handleInputChangeEvent(e.target.value, 3)}
              status={handleInputStatus(cardData.P02.answer[3], cardData.P02.solution[3])}
              readOnly={cardData.P02.isSubmitted}
            />
          </Box>
        </Box>

        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['852', '-', '276']} />
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
                <TD>5</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>6</TD>
                <TD>7</TD>
                <TD>2</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.P02.answer[4]}
                    onChange={e => handleInputChangeEvent(e.target.value, 4)}
                    status={handleInputStatus(cardData.P02.answer[4], cardData.P02.solution[4])}
                    readOnly={cardData.P02.isSubmitted}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer[5]}
                    onChange={e => handleInputChangeEvent(e.target.value, 5)}
                    status={handleInputStatus(cardData.P02.answer[5], cardData.P02.solution[5])}
                    readOnly={cardData.P02.isSubmitted}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.P02.answer[6]}
                    onChange={e => handleInputChangeEvent(e.target.value, 6)}
                    status={handleInputStatus(cardData.P02.answer[6], cardData.P02.solution[6])}
                    readOnly={cardData.P02.isSubmitted}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>

          <Box marginTop='24px'>
            <Typography>723-185 =</Typography>
            <Input
              width='130px'
              ariaLabel='723-185의 값'
              maxLength={5}
              value={cardData.P02.answer[7]}
              onChange={e => handleInputChangeEvent(e.target.value, 7)}
              status={handleInputStatus(cardData.P02.answer[7], cardData.P02.solution[7])}
              readOnly={cardData.P02.isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet height={'50%'} show={isAnswerOpen} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>297, 576, 284, 538</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['691', '-', '394']} />
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
                      <TD width='40px'>10</TD>
                      <TD width='40px'>18</TD>
                      <TD width='40px'>5</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>1</TD>
                      <TD width='40px' isMathCheck>
                        9
                      </TD>
                      <TD width='40px' isMathCheck>
                        6
                      </TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>9</TD>
                      <TD width='40px'>3</TD>
                      <TD width='40px'>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>9</TD>
                      <TD width='40px'>2</TD>
                      <TD width='40px'></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['852', '-', '276']} />
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
                      <TD width='40px'>10</TD>
                      <TD width='40px'>14</TD>
                      <TD width='40px'>7</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>2</TD>
                      <TD width='40px' isMathCheck>
                        5
                      </TD>
                      <TD width='40px' isMathCheck>
                        8
                      </TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>6</TD>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>2</TD>
                      <TD width='40px'>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>6</TD>
                      <TD width='40px'>7</TD>
                      <TD width='40px'>5</TD>
                      <TD width='40px'></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['532', '-', '248']} />
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
                      <TD width='40px'>10</TD>
                      <TD width='40px'>12</TD>
                      <TD width='40px'>4</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>2</TD>
                      <TD width='40px' isMathCheck>
                        3
                      </TD>
                      <TD width='40px' isMathCheck>
                        5
                      </TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>8</TD>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>2</TD>
                      <TD width='40px'>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>4</TD>
                      <TD width='40px'>8</TD>
                      <TD width='40px'>2</TD>
                      <TD width='40px'></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['723', '-', '185']} />
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
                      <TD width='40px'>10</TD>
                      <TD width='40px'>11</TD>
                      <TD width='40px'>6</TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>3</TD>
                      <TD width='40px' isMathCheck>
                        2
                      </TD>
                      <TD width='40px' isMathCheck>
                        7
                      </TD>
                      <TD width='40px'></TD>
                    </TR>
                    <TR>
                      <TD width='40px'>5</TD>
                      <TD width='40px'>8</TD>
                      <TD width='40px'>1</TD>
                      <TD width='40px'>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD width='40px'>8</TD>
                      <TD width='40px'>3</TD>
                      <TD width='40px'>5</TD>
                      <TD width='40px'></TD>
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