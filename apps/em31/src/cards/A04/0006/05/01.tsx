import {
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Box,
  EStyleTableTypes,
  EStyleButtonTypes,
  Input,
  Tag,
  InputStatus,
  ETagLine,
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
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A04000605 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNumber } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P01 = () => {
  const [cardData, setCardData] = useRecoilState(A04000605);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [isShow, setShow] = useState<boolean>(false);
  const [isClickExpression, setIsClickExpression] = useState<boolean>(false); // 초기 식 클릭여부
  const [isAnswer, setIsAnswer] = useState<boolean>(false); // 초기 1단계 입력 여부 ( 2단계에서 1단계 수정이 불가하게 )

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '32×6 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        32×6을 계산하는 방법을 알아보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const data = userSubmissionList[0].inputData[0];
        if (data) {
          setIsAnswer(true);
          setIsClickExpression(true);
        }
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNumber(value)) {
      const newData = [...cardData.p01.answer];
      newData[index] = value;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newData } }));
      changeData('P01', 1, 1, newData);
    }
  };

  useEffect(() => {
    if (cardData.p01.answer[0] === '1' && cardData.p01.answer[1] === '2') {
      setIsAnswer(true);
    }
  }, [cardData.p01.answer]);

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer[0] === cardData.p01.solution[0];
      const isCorrect2 = cardData.p01.answer[1] === cardData.p01.solution[1];
      const isCorrect3 = cardData.p01.answer[2] === cardData.p01.solution[2];
      const isCorrect4 = cardData.p01.answer[3] === cardData.p01.solution[3];
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p01.answer,
              isAnswer: true,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : ' 채점하기'}
      useRound
      vAlign='flex-start'
      submitDisabled={cardData.p01.answer[3] === '' ? true : false}
      submitBtnColor={cardData.p01.answer[3] !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding='20px 44px' useRound onClick={() => setIsClickExpression(true)} cursor='pointer'>
          <Box hAlign='center' flexDirection='column' useRound useFull>
            <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']} marginTop={10}>
              <TableMathCaption caption='세로셈' math={['32', '×', '6']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>일의 자리</TH>
                  <TH scope='col'>십의 자리</TH>
                  <TH scope='col'>연산 기호</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD>
                    {isClickExpression && (
                      <Input
                        type='number'
                        value={cardData.p01.answer[0]}
                        onChange={e => handleChange(0, e.target.value)}
                        ariaLabel='십의자리 올림 답'
                        maxLength={1}
                        readOnly={isAnswer}
                        tabIndex={100}
                        status={
                          !cardData.p01.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p01.answer[0] !== cardData.p01.solution[0]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    )}
                  </TD>
                  <TD></TD>
                </TR>
                <TR>
                  {isClickExpression ? (
                    <>
                      <TDB bColor={!isAnswer ? 'var(--color-blue-200)' : ''}>2</TDB>
                      <TDB bColor={isClickExpression ? (isAnswer ? 'var(--color-pink-200)' : '') : ''}>3</TDB>
                    </>
                  ) : (
                    <>
                      <TD>2</TD>
                      <TD>3</TD>
                    </>
                  )}
                  <TD></TD>
                </TR>
                <TR>
                  {isClickExpression ? <TDB bColor={!isAnswer ? 'var(--color-blue-200)' : 'var(--color-pink-200)'}>6</TDB> : <TD>6</TD>}
                  <TD></TD>
                  <TD>×</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR>
                  {isClickExpression ? (
                    <TDB bColor={!isAnswer ? 'var(--color-blue-200)' : ''}>
                      <Input
                        type='number'
                        value={cardData.p01.answer[1]}
                        onChange={e => handleChange(1, e.target.value)}
                        ariaLabel='일의 자리, 답'
                        maxLength={1}
                        readOnly={isAnswer}
                        tabIndex={101}
                        status={
                          !cardData.p01.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p01.answer[1] !== cardData.p01.solution[1]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    </TDB>
                  ) : (
                    <TD></TD>
                  )}
                  {isClickExpression && isAnswer ? (
                    <TDB bColor={isAnswer ? 'var(--color-pink-200)' : ''}>
                      <Input
                        type='number'
                        value={cardData.p01.answer[3]}
                        onChange={e => handleChange(3, e.target.value)}
                        ariaLabel='십의 자리, 답'
                        maxLength={1}
                        tabIndex={103}
                        readOnly={cardData.p01.isSubmitted}
                        status={
                          !cardData.p01.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p01.answer[3] !== cardData.p01.solution[3]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    </TDB>
                  ) : (
                    <TD></TD>
                  )}
                  {isClickExpression && isAnswer ? (
                    <TDB bColor={isAnswer ? 'var(--color-pink-200)' : ''}>
                      <Input
                        type='number'
                        value={cardData.p01.answer[2]}
                        onChange={e => handleChange(2, e.target.value)}
                        ariaLabel='백의 자리, 답'
                        maxLength={1}
                        readOnly={cardData.p01.isSubmitted}
                        tabIndex={102}
                        status={
                          !cardData.p01.isSubmitted
                            ? InputStatus.ENABLE
                            : cardData.p01.answer[2] !== cardData.p01.solution[2]
                            ? InputStatus.ERROR
                            : InputStatus.DEFAULT
                        }
                      />
                    </TDB>
                  ) : (
                    <TD></TD>
                  )}
                </TR>
              </TFoot>
            </Table>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>1, 2, 1, 9</Box>
          <Box marginTop='30px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px' lineHeight={1.3}>
            <Typography>일의 자리 수 2와 6을 곱한 2×6=12에서 2를 일의 자리에 쓰고 1은 십의 자리로 올립니다.</Typography>
            <Typography>십의 자리 수 3과 6을 곱한 3×6=18에 일의 자리에서 올림한 수 1을 더한 19를 백의 자리와 십의 자리에 씁니다.</Typography>
          </Box>

          <BoxWrap>
            <Box hAlign='center' flexDirection='column' useRound useFull>
              <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption='세로셈' math={['32', '×', '6']} />
                <THead hidden>
                  <TR>
                    <TH scope='col'>일의 자리</TH>
                    <TH scope='col'>십의 자리</TH>
                    <TH scope='col'>연산 기호</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR isMathSolution>
                    <TD></TD>
                    <TD>1</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>2</TD>
                    <TD>3</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>6</TD>
                    <TD></TD>
                    <TD>×</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>2</TD>
                    <TD></TD>
                    <TD></TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
            <Box hAlign='center' flexDirection='column' useRound useFull>
              <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption='세로셈' math={['32', '×', '6']} />
                <THead hidden>
                  <TR>
                    <TH scope='col'>일의 자리</TH>
                    <TH scope='col'>십의 자리</TH>
                    <TH scope='col'>연산 기호</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR isMathSolution>
                    <TD></TD>
                    <TD>1</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>2</TD>
                    <TD>3</TD>
                    <TD></TD>
                  </TR>
                  <TR>
                    <TD>6</TD>
                    <TD></TD>
                    <TD>×</TD>
                  </TR>
                </TBody>
                <TFoot>
                  <TR>
                    <TD>2</TD>
                    <TD>9</TD>
                    <TD>1</TD>
                  </TR>
                </TFoot>
              </Table>
            </Box>
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const TDB = styled(TD)<{ bColor?: string }>`
  background: ${props => props.bColor && props.bColor};
`;
