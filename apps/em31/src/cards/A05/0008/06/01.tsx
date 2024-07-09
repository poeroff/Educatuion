import { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  TMainHeaderInfoTypes,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { A05_0008_06 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A05_0008_06);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect4 = isAnswer(cardData.p01.answer4, cardData.p01.solution4);
      const isCorrect5 = isAnswer(cardData.p01.answer5, cardData.p01.solution5);

      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
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
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '계산해 보세요.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onGrade}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2 && cardData.p01.answer3 && cardData.p01.answer4 && cardData.p01.answer5)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
      useRound
    >
      <BoxWrap>
        <Box type='dashed' padding='20px 22px' useRound useFull flexDirection='column' flex={1} vAlign='center'>
          <Table color={EStyleTableTypes.MATH} width={317}>
            <TableMathCaption caption='세로셈' math={['4분15초', '+', '7분40초']} />
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
                <TD>초</TD>
                <TD>15</TD>
                <TD>분</TD>
                <TD>4</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>40</TD>
                <TD>분</TD>
                <TD>7</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p01.answer2}
                    onChange={e => handleInputChangeEvent(2, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='초 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer2
                        : !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>분</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p01.answer1}
                    onChange={e => handleInputChangeEvent(1, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='분 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer1
                        : !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>

        <Box type='dashed' padding='20px 22px' useRound useFull vAlign='center'>
          <Table color={EStyleTableTypes.MATH} sizes={['450px']}>
            <TableMathCaption caption='세로셈' math={['10시30분55초', '-', '8시10분10초']} />
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
                <TD>초</TD>
                <TD>55</TD>
                <TD>분</TD>
                <TD>30</TD>
                <TD>시</TD>
                <TD>10</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>10</TD>
                <TD>분</TD>
                <TD>10</TD>
                <TD>시</TD>
                <TD>8</TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p01.answer5}
                    onChange={e => handleInputChangeEvent(5, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='초 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer5
                        : !isAnswer(cardData.p01.answer5, cardData.p01.solution5)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>분</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p01.answer4}
                    onChange={e => handleInputChangeEvent(4, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='분 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer4
                        : !isAnswer(cardData.p01.answer4, cardData.p01.solution4)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                  />
                </TD>
                <TD>시</TD>
                <TD>
                  <Input
                    type='number'
                    width='57px'
                    inputSize='small'
                    value={cardData.p01.answer3}
                    onChange={e => handleInputChangeEvent(3, e.target.value)}
                    maxLength={2}
                    readOnly={cardData.p01.isSubmitted}
                    ariaLabel='시 자리의 답'
                    status={
                      !cardData.p01.isSubmitted
                        ? !cardData.p01.answer3
                        : !isAnswer(cardData.p01.answer3, cardData.p01.solution3)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
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
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>11, 55 / 2, 20, 45</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box padding='20px' useRound useFull flexDirection='column' flex={1} vAlign='center'>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['4분15초', '+', '7분40초']} />
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
                      <TD>초</TD>
                      <TD>15</TD>
                      <TD>분</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>초</TD>
                      <TD>40</TD>
                      <TD>분</TD>
                      <TD>7</TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>초</TD>
                      <TD>55</TD>
                      <TD>분</TD>
                      <TD>11</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>

              <Box padding='20px' useRound useFull flexDirection='column' vAlign='center'>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['10시30분55초', '-', '8시10분10초']} />
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
                      <TD>초</TD>
                      <TD>55</TD>
                      <TD>분</TD>
                      <TD>30</TD>
                      <TD>시</TD>
                      <TD>10</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>초</TD>
                      <TD>10</TD>
                      <TD>분</TD>
                      <TD>10</TD>
                      <TD>시</TD>
                      <TD>8</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>초</TD>
                      <TD>45</TD>
                      <TD>분</TD>
                      <TD>40</TD>
                      <TD>시</TD>
                      <TD>2</TD>
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
export default P01;
