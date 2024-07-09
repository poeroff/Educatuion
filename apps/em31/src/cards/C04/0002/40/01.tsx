import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, Image, Input, IQuestionProps, Label, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { getInputStatus, getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import C04000240State from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C04000240State);

  const [showAnswer, setShowAnswer] = useState(false);

  const pageKey = 'P01';
  const answer1 = '4';
  const answer2 = '80';
  const answer3 = '80';
  const explanation = '수정이가 던진 화살이 20점에 4개 꽂혀 있으므로 20×4=80(점)입니다.';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Typography fontSize='36px'>
        <SvgIcon src={headerIcon} size='36px' />
        &nbsp;과녁 맞히기 놀이에서 수정이가 맞힌 과녁입니다. 화살이 꽂힌 곳에 적힌 수만큼 점수를 얻는다면 수정이가 얻은 점수는 몇 점인가요?
      </Typography>
    ),
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
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
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList?.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            input1: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].input1,
            isAnswer1Correct: userSubmissionList[0].inputData[0]?.isCorrect || cardData[pageKey].isAnswer1Correct,
            input2: userSubmissionList[0].inputData[1]?.value || cardData[pageKey].input2,
            isAnswer2Correct: userSubmissionList[0].inputData[1]?.isCorrect || cardData[pageKey].isAnswer2Correct,
            input3: userSubmissionList[0].inputData[2]?.value || cardData[pageKey].input3,
            isAnswer3Correct: userSubmissionList[0].inputData[2]?.isCorrect || cardData[pageKey].isAnswer3Correct,
            isCorrect: userSubmissionList[0].isCorrect || cardData[pageKey].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isAnswer1Correct = cardData[pageKey].input1 === answer1;
    const isAnswer2Correct = cardData[pageKey].input2 === answer2;
    const isAnswer3Correct = cardData[pageKey].input3 === answer3;
    const isCorrect = isAnswer1Correct && isAnswer2Correct && isAnswer3Correct;

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
        isAnswer1Correct,
        isAnswer2Correct,
        isAnswer3Correct,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].input1,
            isAnswer: true,
            isCorrect: isAnswer1Correct,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData[pageKey].input2,
            isAnswer: true,
            isCorrect: isAnswer2Correct,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData[pageKey].input3,
            isAnswer: true,
            isCorrect: isAnswer3Correct,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setShowAnswer(prev => !prev);
    } else {
      submitAnswer();
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputChange = (subKey: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [`input${subKey}`]: value } }));
    changeData(pageKey, 1, subKey, value);
  };

  const isInputComplete = useMemo(() => {
    return !!cardData[pageKey].input1.trim() && !!cardData[pageKey].input2 && !!cardData[pageKey].input3;
  }, [cardData[pageKey].input1, cardData[pageKey].input2, cardData[pageKey].input3]);

  const getSubmitBtnColor = (isInputComplete: boolean, showAnswer: boolean): EStyleButtonTypes => {
    if (!isInputComplete) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.YELLOW;
  };

  return (
    <DialogContainer
      bodyId='targetContainer2'
      headerInfo={null}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor(isInputComplete, showAnswer)}
      submitDisabled={!isInputComplete}
      onSubmit={handleSubmit}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='32px 20px 0px 20px' type='line' useRound>
          <Image
            src='/C04/0002/40/DEC314002.png'
            alt='과녁에 20점, 40점, 60점이 있고, 4개의 화살 모두 20점에 꽂혀 있는 그림입니다.'
            width='200px'
            height='200px'
          />
        </Box>
        <Box marginTop='24px'>
          <Box>
            <Label
              value='식'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              marginRight={8}
            />
            20×
            <Input
              type='number'
              maxLength={1}
              width='50px'
              value={cardData[pageKey].input1}
              onChange={e => handleInputChange(1, e)}
              status={cardData[pageKey].isSubmitted && getInputStatus(cardData[pageKey].isAnswer1Correct, cardData[pageKey].input1)}
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='20에 곱할 값을 적어주세요.'
            />
            =
            <Input
              type='number'
              maxLength={5}
              width='130px'
              value={cardData[pageKey].input2}
              onChange={e => handleInputChange(2, e)}
              status={cardData[pageKey].isSubmitted && getInputStatus(cardData[pageKey].isAnswer2Correct, cardData[pageKey].input2)}
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='20×몇의 값을 적어주세요.'
            />
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              maxLength={5}
              width='130px'
              marginLeft={8}
              value={cardData[pageKey].input3}
              onChange={e => handleInputChange(3, e)}
              status={cardData[pageKey].isSubmitted && getInputStatus(cardData[pageKey].isAnswer3Correct, cardData[pageKey].input3)}
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답을 적어주세요.'
            />
            <Typography>점</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet height='50%' show={showAnswer} bottomSheetTargetId='targetContainer2'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display='flex' flexDirection='column' marginTop='12px' gap='20px'>
              <Typography>{`${answer1}, ${answer2}, ${answer3}`}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display='flex' flexDirection='column' marginTop='12px' gap='20px'>
              <Typography>{explanation}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P01;
