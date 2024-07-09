import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B04_0005_50 } from './store';

const P02 = () => {
  const pageKey = 'p02';
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0005_50);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        계산해 보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData[pageKey].answer.join('') === cardData[pageKey].solution.join('');
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: cardData[pageKey].answer,
        isCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer[0],
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData[pageKey].answer[1],
          },
          {
            subKey: 3,
            type: 'NUMBER',
            value: cardData[pageKey].answer[2],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: [userSubmissionList[0]?.inputData[0], userSubmissionList[0]?.inputData[1]],
            isCorrect: userSubmissionList[0]?.isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const newAnswer = cardData[pageKey].answer.map((item, idx) => (subKey === idx + 1 ? value : item));
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: newAnswer } }));
    changeData(pageKey, 1, 1, newAnswer);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      bodyId='targetContainer'
      submitLabel={cardData[pageKey].isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData[pageKey].answer.every(item => isNotEmptyString(item))
          ? showAnswer
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      background={'var(--color-white)'}
      useRound
      submitDisabled={cardData[pageKey].answer.some(item => !isNotEmptyString(item))}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap justifyContent='center'>
        <Box type='dashed' hAlign='center' flexDirection='column' padding='24px 20px' useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['14', 'x', '7']} />
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
                <TD>1</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>7</TD>
                <TD></TD>
                <TD>x</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    type='number'
                    status={
                      cardData[pageKey].isSubmitted && cardData[pageKey].answer[1] !== cardData[pageKey].solution[1]
                        ? InputStatus.ERROR
                        : cardData[pageKey].answer[1]
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    value={cardData[pageKey].answer[1]}
                    onChange={e => handleChange(2, e.target.value.trim())}
                    ariaLabel='일의 자리의 값'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                  />
                </TD>
                <TD>
                  <Input
                    type='number'
                    status={
                      cardData[pageKey].isSubmitted && cardData[pageKey].answer[0] !== cardData[pageKey].solution[0]
                        ? InputStatus.ERROR
                        : cardData[pageKey].answer[0]
                        ? InputStatus.ENABLE
                        : InputStatus.DEFAULT
                    }
                    value={cardData[pageKey].answer[0]}
                    onChange={e => handleChange(1, e.target.value.trim())}
                    ariaLabel='십의 자리의 값'
                    maxLength={1}
                    readOnly={cardData[pageKey].isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <BottomSheet height='50%' show={showAnswer} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' marginRight='20px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography useGap={false}>{cardData[pageKey].solution.join('')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box hAlign='start' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['14', 'x', '7']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>2</TD>
                    </TR>
                    <TR>
                      <TD>4</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD></TD>
                      <TD>x</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>8</TD>
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
