import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  Tag,
  Typography,
  THead,
  TR,
  TH,
  TBody,
  TD,
  TFoot,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B04_0006_50 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0006_50);

  const { userId } = useRecoilValue(studentAtom);

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
  };
  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
    const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;
    const isCorrect3 = cardData.p02.answer3.trim() === cardData.p02.solution3;
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer1,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer2,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer3,
            isCorrect: isCorrect3,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
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
      ],
    },
  ];

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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
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

  const headerInfo = null;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        계산해 보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)
          ? EStyleButtonTypes.SECONDARY
          : showAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
    >
      <Box hAlign='center' flexDirection='column' useRound useFull>
        <Box type='dashed' useRound padding='24px 48px'>
          <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['26', '×', '5']} />
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
                <TD>7</TD>
                <TD>4</TD>
                <TD></TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD></TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer1}
                    status={
                      !isNotEmptyString(cardData.p02.answer1)
                        ? InputStatus.DEFAULT
                        : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1, cardData.p02.solution1)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    onChange={e => handleChange(1, e.target.value)}
                    ariaLabel='일의 자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer2}
                    status={
                      !isNotEmptyString(cardData.p02.answer2)
                        ? InputStatus.DEFAULT
                        : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer2, cardData.p02.solution2)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    onChange={e => handleChange(2, e.target.value)}
                    ariaLabel='십의 자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    value={cardData.p02.answer3}
                    status={
                      !isNotEmptyString(cardData.p02.answer3)
                        ? InputStatus.DEFAULT
                        : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer3, cardData.p02.solution3)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    onChange={e => handleChange(3, e.target.value)}
                    ariaLabel='백의 자리, 답'
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={showAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>141</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['25%', '25%', '25%', '25%']}>
                  <TableMathCaption caption='세로셈' math={['373', '-', '119']} />
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
                      <TD>2</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>4</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD></TD>
                      <TD></TD>
                      <TD>×</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>{cardData.p02.solution1}</TD>
                      <TD>{cardData.p02.solution2}</TD>
                      <TD>{cardData.p02.solution3}</TD>
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
