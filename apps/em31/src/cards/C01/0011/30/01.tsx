import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
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
  SvgIcon,
} from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { C01_0011_30 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
const P01 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01_0011_30);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='48px' />
        계산해 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const isInputAnswerCorrect = (answerList: string[], solutionList: string[]) => {
    const incorrectPattern = /\d\s+\d/;
    return answerList.map((answer, index) => {
      if (incorrectPattern.test(answer)) {
        return false;
      }
      return isAnswer(answer, solutionList[index]);
    });
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = isInputAnswerCorrect(cardData.p01.answer, cardData.p01.solution);
    console.log(isCorrect);
    const isAllCorrect = isCorrect.every(answer => answer);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer[4],
            isCorrect: isCorrect[4],
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer[5],
            isCorrect: isCorrect[5],
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p01.answer[6],
            isCorrect: isCorrect[6],
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p01.answer[7],
            isCorrect: isCorrect[7],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
  };

  const { userId } = useRecoilValue(studentAtom);
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
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
                userSubmissionList[0].inputData[5]?.value,
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
              ] || cardData.p01.answer,
            isCorrect:
              [
                userSubmissionList[0].inputData[0]?.isCorrect,
                userSubmissionList[0].inputData[1]?.isCorrect,
                userSubmissionList[0].inputData[2]?.isCorrect,
                userSubmissionList[0].inputData[3]?.isCorrect,
                userSubmissionList[0].inputData[4]?.isCorrect,
                userSubmissionList[0].inputData[5]?.isCorrect,
                userSubmissionList[0].inputData[6]?.isCorrect,
                userSubmissionList[0].inputData[7]?.isCorrect,
              ] || cardData.p01.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (subKey: number, value: string) => {
    const inputAnswer = [...cardData.p01.answer];
    inputAnswer[subKey - 1] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: inputAnswer } }));
    changeData('P01', 1, subKey, value);
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p01.answer];
    const hasEmptyValue = answerList.some(element => element === '');

    return !hasEmptyValue;
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['352', '+', '416']} />
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
                <TD>5</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>6</TD>
                <TD>1</TD>
                <TD>4</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer[0]}
                    onChange={e => handleChange(1, e.target.value)}
                    ariaLabel='일의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[0] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[0] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[1]}
                    onChange={e => handleChange(2, e.target.value)}
                    ariaLabel='십의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[1] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[1] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[2]}
                    onChange={e => handleChange(3, e.target.value)}
                    ariaLabel='백의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[2] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[2] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>145+528=</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[3]}
              onChange={e => handleChange(4, e.target.value)}
              ariaLabel='145+528의 값'
              readOnly={cardData.p01.isSubmitted}
              status={!cardData.p01.answer[3] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[3] ? 'error' : 'enable'}
            />
          </Box>
        </Box>
        <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['547', '-', '139']} />
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
                <TD>4</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>9</TD>
                <TD>3</TD>
                <TD>1</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer[4]}
                    onChange={e => handleChange(5, e.target.value)}
                    ariaLabel='일의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[4] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[4] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[5]}
                    onChange={e => handleChange(6, e.target.value)}
                    ariaLabel='십의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[5] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[5] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData.p01.answer[6]}
                    onChange={e => handleChange(7, e.target.value)}
                    ariaLabel='백의 자리의 답'
                    readOnly={cardData.p01.isSubmitted}
                    status={!cardData.p01.answer[6] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[6] ? 'error' : 'enable'}
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography>824-567=</Typography>
            <Input
              width='130px'
              value={cardData.p01.answer[7]}
              onChange={e => handleChange(8, e.target.value)}
              ariaLabel='824-567의 값'
              readOnly={cardData.p01.isSubmitted}
              status={!cardData.p01.answer[7] ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect[7] ? 'error' : 'enable'}
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
            setIsShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>768, 408, 773, 257</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap display={'flex'} flexDirection={'column'}>
              <BoxWrap>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['352', '+', '416']} />
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
                        <TD></TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>2</TD>
                        <TD>5</TD>
                        <TD>3</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>6</TD>
                        <TD>1</TD>
                        <TD>4</TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>8</TD>
                        <TD>6</TD>
                        <TD>7</TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </Box>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['547', '-', '139']} />
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
                        <TD>3</TD>
                        <TD></TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>7</TD>
                        <TD isMathCheck>4</TD>
                        <TD>5</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>9</TD>
                        <TD>3</TD>
                        <TD>1</TD>
                        <TD>-</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>8</TD>
                        <TD>0</TD>
                        <TD>4</TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </Box>
              </BoxWrap>
              <BoxWrap marginTop={'40px'}>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['245', '+', '528']} />
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
                        <TD>4</TD>
                        <TD>2</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>8</TD>
                        <TD>2</TD>
                        <TD>5</TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>3</TD>
                        <TD>7</TD>
                        <TD>7</TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </Box>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['824', '-', '567']} />
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
                        <TD>11</TD>
                        <TD>7</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>4</TD>
                        <TD isMathCheck>2</TD>
                        <TD isMathCheck>8</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>7</TD>
                        <TD>6</TD>
                        <TD>5</TD>
                        <TD>-</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>7</TD>
                        <TD>5</TD>
                        <TD>2</TD>
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

export default P01;
