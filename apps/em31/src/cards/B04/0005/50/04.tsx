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
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B04_0005_50 } from './store';

const P04 = () => {
  const pageKey = 'p04';
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0005_50);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={4} />
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    const isCorrect = cardData[pageKey].answer.trim() === cardData[pageKey].solution;
    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
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
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
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
            answer: userSubmissionList[0]?.inputData[0],
            isCorrect: userSubmissionList[0]?.isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(pageKey, 1, 1, value);
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
      submitBtnColor={cardData[pageKey].answer ? (showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData[pageKey].answer}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap justifyContent='center'>
        <Box type='dashed' hAlign='center' flexDirection='column' padding='24px 20px' useRound>
          <Box>
            <Typography>49 x 2 =</Typography>
            <Input
              width='130px'
              ariaLabel='49x2의 값.'
              type='text'
              status={
                cardData[pageKey].isSubmitted && cardData[pageKey].answer.trim() !== cardData[pageKey].solution
                  ? InputStatus.ERROR
                  : cardData[pageKey].answer
                  ? InputStatus.ENABLE
                  : InputStatus.DEFAULT
              }
              value={cardData[pageKey].answer}
              onChange={e => handleChange(e.target.value)}
              readOnly={cardData[pageKey].isSubmitted}
            />
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet height='50%' show={showAnswer} bottomSheetTargetId='targetContainer'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' marginRight='20px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography useGap={false}>{cardData[pageKey].solution}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box hAlign='start' marginTop='22px' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['49', 'x', '2']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>1</TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>2</TD>
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

export default P04;
