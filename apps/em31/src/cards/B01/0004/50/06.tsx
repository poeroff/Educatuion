import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Input, Label, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getInputStatus, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import MathTable from './components/MathTable';
import B01000450State from './store';
import GrayRoundBox from './components/GrayRoundBox';

const expression = '878+962';
const answer = '1840';

const P06 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B01000450State);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const isInputComplete = useMemo(() => isNotEmptyString(cardData.p06.input), [cardData.p06.input]);
  const isCorrect = useMemo(() => cardData.p06.input === answer, [cardData.p06.input]);

  useEffect(() => {
    if (cardData.p06.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p06.isSubmitted, isCorrect]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={6} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark,
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
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P06')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            input: userSubmissionList[0].inputData[0]?.value || cardData.p06.input,
            isSubmitted,
          },
        }));
      }
      initData('P06', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P06');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p06.input,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P06', userSubmission, isCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p06.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCardData(prev => ({
      ...prev,
      p06: {
        ...prev.p06,
        input: value,
      },
    }));
    changeData('P06', 1, 1, value);
  }, []);

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.YELLOW;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p06.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box padding='24px 48px' type='dashed' hAlign='center' flexDirection='column' useRound>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              878
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 962</GrayRoundBox>
            </Box>
            <Box>
              <Input
                type='number'
                width='130px'
                maxLength={6}
                value={cardData.p06.input}
                status={cardData.p06.isSubmitted && getInputStatus(isCorrect, cardData.p06.input)}
                readOnly={cardData.p06.isSubmitted}
                onChange={handleInputChange}
                ariaLabel='답 입력란'
              />
            </Box>
          </BoxWrap>
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
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{answer}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box>
                <MathTable expression={expression} answer={answer} solution={['1', '1', '']} />
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P06;