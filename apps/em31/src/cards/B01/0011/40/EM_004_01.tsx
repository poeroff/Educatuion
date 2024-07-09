import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
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
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import { B01001140 } from './store';
interface IProps {
  storeKey: 'P01' | 'P02' | 'P03' | 'P04' | 'P05';
  firstNum: number;
  secondNum: number;
  operand: '+' | '-' | 'x' | '÷';
  mathSolutionList?: string[];
  mathCheckList?: number[];
}

const EM_004_01 = (props: IProps) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B01001140);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { storeKey, firstNum, secondNum, operand, mathSolutionList, mathCheckList } = props;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
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
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData[storeKey].isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect1 = cardData[storeKey].answer1 === cardData[storeKey].solution1;
    const isCorrect2 = cardData[storeKey].answer2 === cardData[storeKey].solution2;
    const isCorrect3 = cardData[storeKey].answer3 === cardData[storeKey].solution3;
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect, isCorrect1, isCorrect2, isCorrect3 } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[storeKey].answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[storeKey].answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData[storeKey].answer3,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(storeKey, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === storeKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer1: userSubmissionList[0].inputData[0]?.value || cardData[storeKey].answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData[storeKey].answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData[storeKey].answer3,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData[storeKey].isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData[storeKey].isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData[storeKey].isCorrect3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(storeKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], answer3: value } }));
    }
    changeData(storeKey, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(storeKey);
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
      useRound
      submitLabel={cardData[storeKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData[storeKey].answer1 && cardData[storeKey].answer2 && cardData[storeKey].answer3)}
      onSubmit={submitAnswer}
      submitBtnColor={
        !(cardData[storeKey].answer1 && cardData[storeKey].answer2 && cardData[storeKey].answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
    >
      <BoxWrap justifyContent='center'>
        <Box type='dashed' hAlign='center' flexDirection='column' padding='24px 20px' useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={[firstNum.toString(), operand, secondNum.toString()]} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                {firstNum
                  .toString()
                  .split('')
                  .reverse()
                  .map((num, index) => {
                    return <TD>{num}</TD>;
                  })}
                <TD></TD>
              </TR>
              <TR>
                {secondNum
                  .toString()
                  .split('')
                  .reverse()
                  .map((num, index) => {
                    return <TD>{num}</TD>;
                  })}
                <TD>{operand}</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData[storeKey].answer1}
                    onChange={event => handleChange(1, event.target.value)}
                    ariaLabel='일의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[storeKey].isSubmitted}
                    status={cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect1 ? InputStatus.ERROR : undefined}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData[storeKey].answer2}
                    onChange={event => handleChange(2, event.target.value)}
                    ariaLabel='십의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[storeKey].isSubmitted}
                    status={cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect2 ? InputStatus.ERROR : undefined}
                  />
                </TD>
                <TD>
                  <Input
                    value={cardData[storeKey].answer3}
                    onChange={event => handleChange(3, event.target.value)}
                    ariaLabel='백의 자리의 답'
                    maxLength={1}
                    readOnly={cardData[storeKey].isSubmitted}
                    status={cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect3 ? InputStatus.ERROR : undefined}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData[storeKey].solution3 + cardData[storeKey].solution2 + cardData[storeKey].solution1}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={[firstNum.toString(), operand, secondNum.toString()]} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>백의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {mathSolutionList && (
                      <TR isMathSolution>
                        {mathSolutionList.map(v => {
                          return <TD>{v}</TD>;
                        })}
                      </TR>
                    )}

                    <TR>
                      {firstNum
                        .toString()
                        .split('')
                        .reverse()
                        .map((num, index) => {
                          if (mathCheckList && mathCheckList[index]) {
                            return <TD isMathCheck>{num}</TD>;
                          }
                          return <TD>{num}</TD>;
                        })}
                      <TD></TD>
                    </TR>
                    <TR>
                      {secondNum
                        .toString()
                        .split('')
                        .reverse()
                        .map((num, index) => {
                          return <TD>{num}</TD>;
                        })}
                      <TD>{operand}</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>{cardData[storeKey].solution1}</TD>
                      <TD>{cardData[storeKey].solution2}</TD>
                      <TD>{cardData[storeKey].solution3}</TD>
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

export default EM_004_01;
