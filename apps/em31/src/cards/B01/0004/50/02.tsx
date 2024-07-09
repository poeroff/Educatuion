import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Label, TMarkType, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import MathTable from './components/MathTable';
import B01000450State from './store';

const expression = '822+739';
const answer = '1561';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(B01000450State);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');

  const isInputComplete = useMemo(() => cardData.p02.inputs.every(isNotEmptyString), [cardData.p02.inputs]);
  const isCorrect = useMemo(() => cardData.p02.inputs.every((value, index) => value === answer[index]), [cardData.p02.inputs]);

  useEffect(() => {
    if (cardData.p02.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p02.isSubmitted, cardData.p02.inputs]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        계산해 보세요.
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
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
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
            inputs: userSubmissionList[0].inputData[0]?.value || cardData.p02.inputs,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const submitAnswer = () => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.inputs,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  const handleInputChange = useCallback((newInputs: string[]) => {
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        inputs: newInputs,
      },
    }));

    changeData('P02', 1, 1, newInputs);
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
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box padding='24px 48px' type='dashed' hAlign='center' flexDirection='column' useRound>
          <MathTable
            expression={expression}
            answer={answer}
            values={cardData.p02.inputs}
            onChange={handleInputChange}
            isSubmitted={cardData.p02.isSubmitted}
          />
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
                <MathTable expression={expression} answer={answer} solution={['', '1', '']} />
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
