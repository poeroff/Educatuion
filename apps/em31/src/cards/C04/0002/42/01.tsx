import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, Input, IQuestionProps, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { getInputStatus, getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import C04000242State from './store';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C04000242State);

  const [showAnswer, setShowAnswer] = useState(false);

  const pageKey = 'P01';
  const answer = '사과';
  const explanation = `귤은 한 상자에 20개씩 2상자가 있으므로 20×2=40(개)이고,
    사과는 한 상자에 10개씩 5상자가 있으므로 10×5=50(개)입니다.
    따라서 40<50이므로 사과가 더 많습니다.`;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Typography fontSize='36px'>
        <SvgIcon src={headerIcon} size='36px' />
        &nbsp;귤은 한 상자에 20개씩 2상자가 있고, 사과는 한 상자에 10개씩 5상자가 있습니다. 귤과 사과 중에서 어느 것이 더 많은가요?
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
            input: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].input,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || cardData[pageKey].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = answer === cardData[pageKey].input;

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        isSubmitted: true,
        isCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].input,
            isAnswer: true,
            isCorrect: isCorrect,
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

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], input: value } }));
    changeData(pageKey, 1, 1, value);
  };

  const isInputComplete = useMemo(() => {
    return !!cardData[pageKey].input.trim();
  }, [cardData[pageKey].input]);

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
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input
            maxLength={2}
            width='130px'
            value={cardData[pageKey].input}
            onChange={e => handleInputChange(e.target.value.trim())}
            status={cardData[pageKey].isSubmitted && getInputStatus(cardData[pageKey].isCorrect, cardData[pageKey].input)}
            readOnly={cardData[pageKey].isSubmitted}
            ariaLabel='답 입력란'
          />
        </Box>
      </Box>
      <BottomSheet height='50%' show={showAnswer} bottomSheetTargetId='targetContainer2'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display='flex' flexDirection='column' marginTop='12px' gap='20px'>
              <Typography>{answer}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display='flex' flexDirection='column' marginTop='12px' gap='20px'>
              <Typography usePre>{explanation}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P01;
