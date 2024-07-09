import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { ChangeEvent, useEffect, useState } from 'react';
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
  SvgIcon,

} from '@maidt-cntn/ui';

import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { C01000350 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';



const P01 = () => {

  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C01000350);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [isCorrectInputList, setIsCorrectInputList] = useState([false, false, false, false, false, false, false, false])
  const PAGE_NUMBER = 'P01'

  const isSubmitted = cardData.p01.isSubmitted;

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
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        계산해 보세요.
      </>
    ),
  };
  const init = async () => {

    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        const answer = [
          ...String(userSubmissionList[0].inputData[0].value).split('').reverse(),
          ...String(userSubmissionList[0].inputData[1].value).split('').reverse(),
          String(userSubmissionList[0].inputData[2].value),
          String(userSubmissionList[0].inputData[3].value),
        ] || cardData.p01.answer

        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));

        const isCorrectObj = answerChecker(answer);
        setIsCorrectInputList(isCorrectObj.isCorrectInputList)





      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }

  }

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    // 0~2, 3~5, 6, 7
    const targetNum = event.target.value
    const newAnswer = [...cardData.p01.answer]
    newAnswer[index] = event.target.value
    setCardData(prev => {

      return ({ ...prev, p01: { ...prev.p01, answer: newAnswer } })
    });

    const subKey = index < 6 ? Math.floor(index / 3) : index - 4
    changeData(PAGE_NUMBER, 1, subKey,
      index < 6 ?
        arrayToNumber(newAnswer.slice(((subKey - 1) * 3), ((subKey - 1) * 3) + 3)) : targetNum
    )
  };
  function arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Check if all elements are the same
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  const answerChecker = (inputAnswers: string[] | undefined = undefined) => {
    // input 4개에 대한 포맷팅 및 채점
    const answers = inputAnswers || cardData.p01.answer
    const formatedAnswer = [arrayToNumber(answers.slice(0, 3)), arrayToNumber(answers.slice(3, 6)), Number(answers[6]), Number(answers[7])]
    const solutionFlats: string[] = []
    cardData.p01.solution.forEach((v, i) => {
      if (i < 2) {
        const nums = v.toString().split('').map(v => v)
        for (let i = nums.length - 1; i > -1; i--) {
          solutionFlats.push(nums[i])
        }
      } else {
        solutionFlats.push(String(v))
      }

    })

    const isCorrectInputList = answers.map((v, i) => {
      if (v == solutionFlats[i]) {
        return true
      }
      return false
    })
    const isCorrectList = cardData.p01.solution.map((sol, index) => {
      if (formatedAnswer[index] === sol) {
        return true
      }
      return false
    })
    const isCorrect = arraysAreEqual(formatedAnswer, cardData.p01.solution)

    return {
      isCorrect: isCorrect,
      isCorrectInputList: isCorrectInputList,
      isCorrectList: isCorrectList
    }

  };

  const handleSubmit = () => {
    const { answer, isSubmitted, solution } = cardData.p01;

    if (!isSubmitted) {
      const isCorrectObj = answerChecker();

      setIsCorrectInputList(isCorrectObj.isCorrectInputList)

      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrectObj.isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: arrayToNumber(answer.slice(0, 3)),
              isAnswer: true,
              isCorrect: isCorrectObj.isCorrectList[0],
            },
            {
              subKey: 2,
              type: 'NUMBER',
              value: arrayToNumber(answer.slice(3, 6)),
              isAnswer: true,
              isCorrect: isCorrectObj.isCorrectList[1],
            },
            {
              subKey: 3,
              type: 'NUMBER',
              value: Number(answer[6]),
              isAnswer: true,
              isCorrect: isCorrectObj.isCorrectList[2],
            },
            {
              subKey: 4,
              type: 'NUMBER',
              value: Number(answer[7]),
              isAnswer: true,
              isCorrect: isCorrectObj.isCorrectList[3],
            },
          ],
          isCorrect: isCorrectObj.isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectObj.isCorrect);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };


  const arrayToNumber = (arr: string[]) => {
    return Number(arr[0]) + Number(arr[1]) * 10 + Number(arr[2]) * 100
  }

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
      submitLabel={cardData.p01.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(Array.isArray(cardData.p01.answer) ? cardData.p01.answer?.every(v => v != '') : false)}
      submitBtnColor={
        !(Array.isArray(cardData.p01.answer) ? cardData.p01.answer?.every(v => v != '') : false) ? EStyleButtonTypes.GRAY
          :
          (cardData.p01.isSubmitted && isAnswerShow) ? EStyleButtonTypes.GRAY :
            (isShow ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.YELLOW)
      }
      // !!!!!!!!!
      // 임시로 채점하기 클릭 시 바텀시트(해설, 답안) 보이도록 했습니다.
      onSubmit={() => {
        //setShow(!isShow);
        handleSubmit();

      }}
      vAlign='flex-start'
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
                <TD>3</TD>
                <TD>7</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>0</TD>
                <TD>1</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={String(cardData.p01.answer[0])}
                    onChange={(e) => { handleAnswerChange(e, 0) }}
                    ariaLabel='일의 자리의 답' maxLength={1}
                    status={isSubmitted && !isCorrectInputList[0] ? 'error' : ''}
                    tabIndex={101}
                  />
                </TD>
                <TD>
                  <Input value={String(cardData.p01.answer[1])}
                    onChange={(e) => { handleAnswerChange(e, 1) }}
                    ariaLabel='십의 자리의 답' maxLength={1}
                    status={isSubmitted && !isCorrectInputList[1] ? 'error' : ''}
                    tabIndex={102}
                  />
                </TD>
                <TD>
                  <Input value={String(cardData.p01.answer[2])}
                    onChange={(e) => { handleAnswerChange(e, 2) }}
                    ariaLabel='백의 자리의 답' maxLength={1}
                    status={isSubmitted && !isCorrectInputList[2] ? 'error' : ''}
                    tabIndex={103}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px' >
            <Typography ><MathExpression equation={'$195+513=$'} /></Typography>
            <Input width='130px'
              value={String(cardData.p01.answer[6])}
              onChange={(e) => { handleAnswerChange(e, 6) }}
              ariaLabel='195+513의 값' maxLength={4}
              status={isSubmitted && !isCorrectInputList[6] ? 'error' : ''}
              tabIndex={104}
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
                <TD>4</TD>
                <TD>6</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>1</TD>
                <TD>8</TD>
                <TD>4</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={String(cardData.p01.answer[3])}
                    onChange={(e) => { handleAnswerChange(e, 3) }}
                    ariaLabel='일의 자리의 답' maxLength={1}
                    status={isSubmitted && !isCorrectInputList[3] ? 'error' : ''}
                    tabIndex={105}
                  />
                </TD>
                <TD>
                  <Input value={String(cardData.p01.answer[4])}
                    onChange={(e) => { handleAnswerChange(e, 4) }}
                    ariaLabel='십의 자리의 답' maxLength={1}
                    status={isSubmitted && !isCorrectInputList[4] ? 'error' : ''}
                    tabIndex={106}
                  />
                </TD>
                <TD>


                  <Input value={String(cardData.p01.answer[5])}
                    onChange={(e) => { handleAnswerChange(e, 5) }}
                    ariaLabel='백의 자리의 답' maxLength={1}
                    status={isSubmitted && !isCorrectInputList[5] ? 'error' : ''}
                    tabIndex={107}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
          <Box marginTop='24px'>
            <Typography><MathExpression equation={'$428+227=$'} /></Typography>
            <Input width='130px'
              value={String(cardData.p01.answer[7])}
              onChange={(e) => { handleAnswerChange(e, 7) }}
              ariaLabel='428+227의 값' maxLength={4}
              status={isSubmitted && !isCorrectInputList[7] ? 'error' : ''}
              tabIndex={108}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isAnswerShow}
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
              <Typography>{
                cardData.p01.solution.reduce((acc, cur, index) => {
                  if (index == cardData.p01.solution.length - 1) {
                    return acc + cur
                  }
                  return acc + cur + ','
                }, '')
              }</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap display={'flex'} flexDirection={'column'}>
              <BoxWrap>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['273', '+', '108']} />
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
                        <TD>3</TD>
                        <TD>7</TD>
                        <TD>2</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>8</TD>
                        <TD>0</TD>
                        <TD>1</TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>
                          <Input value={'1'} disabled={true} onChange={() => { }} ariaLabel='일의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'8'} disabled={true} onChange={() => { }} ariaLabel='십의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'3'} disabled={true} onChange={() => { }} ariaLabel='백의 자리의 답' maxLength={1} />
                        </TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </Box>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['364', '+', '481']} />
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
                        <TD>4</TD>
                        <TD>6</TD>
                        <TD>3</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>1</TD>
                        <TD>8</TD>
                        <TD>4</TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>
                          <Input value={'5'} disabled={true} onChange={() => { }} ariaLabel='일의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'4'} disabled={true} onChange={() => { }} ariaLabel='십의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'8'} disabled={true} onChange={() => { }} ariaLabel='백의 자리의 답' maxLength={1} />
                        </TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </Box>
              </BoxWrap>
              <BoxWrap marginTop={'40px'}>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['195', '+', '513']} />
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
                        <TD>5</TD>
                        <TD>9</TD>
                        <TD>1</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>3</TD>
                        <TD>1</TD>
                        <TD>5</TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>
                          <Input value={'8'} disabled={true} onChange={() => { }} ariaLabel='일의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'0'} disabled={true} onChange={() => { }} ariaLabel='십의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'7'} disabled={true} onChange={() => { }} ariaLabel='백의 자리의 답' maxLength={1} />
                        </TD>
                        <TD></TD>
                      </TR>
                    </TFoot>
                  </Table>
                </Box>
                <Box hAlign='center' flexDirection='column' useRound useFull>
                  <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                    <TableMathCaption caption='세로셈' math={['428', '+', '227']} />
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
                        <TD>8</TD>
                        <TD>2</TD>
                        <TD>4</TD>
                        <TD></TD>
                      </TR>
                      <TR>
                        <TD>7</TD>
                        <TD>2</TD>
                        <TD>2</TD>
                        <TD>+</TD>
                      </TR>
                    </TBody>
                    <TFoot>
                      <TR>
                        <TD>
                          <Input value={'5'} disabled={true} onChange={() => { }} ariaLabel='일의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'5'} disabled={true} onChange={() => { }} ariaLabel='십의 자리의 답' maxLength={1} />
                        </TD>
                        <TD>
                          <Input value={'6'} disabled={true} onChange={() => { }} ariaLabel='백의 자리의 답' maxLength={1} />
                        </TD>
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
