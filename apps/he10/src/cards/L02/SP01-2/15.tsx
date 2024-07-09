import {
  BottomSheet,
  Box,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02SP01_2 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';

const P15 = () => {
  const PAGE_NUMBER = 'P15';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP01_2);

  const [mark, setMark] = useState<TMarkType>('none');
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 빈 칸에 들어갈 알맞은 표현을 고르세요.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/SP01-2/HE1-L02-SP01-2-P15.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['fun', 'tongue', 'greeting'], []);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
        },
      ],
    },
  ];

  const isCorrect = useMemo(() => cardData.p15.inputs.every((value, idx) => value === answers[idx]), [cardData.p15.inputs]);

  useEffect(() => {
    if (cardData.p15.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p15.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p15: {
            ...prev.p15,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p15.inputs,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p15.isSubmitted) {
      setShowAnswer(!showAnswer);
    } else {
      setCardData(prev => ({ ...prev, p15: { ...prev.p15, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p15.inputs,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleDropdownClick = useCallback(
    (index: number, value?: string) => {
      if (!value) {
        setOpenedIndex(index);
        return;
      }

      const newInputs = [...cardData.p15.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p15: { ...prev.p15, inputs: newInputs } }));
      changeData(PAGE_NUMBER, 1, 1, newInputs);
    },
    [cardData.p15.inputs, setOpenedIndex],
  );

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.p15.inputs.some(input => input.trim() === '');
    return isEmptyInputExist;
  }, [cardData.p15.inputs]);

  const submitBtnColor: EStyleButtonTypes = useMemo(() => {
    if (isSubmitDisabled) {
      return EStyleButtonTypes.SECONDARY;
    } else if (showAnswer) {
      return EStyleButtonTypes.GRAY;
    }
    return EStyleButtonTypes.PRIMARY;
  }, [isSubmitDisabled, showAnswer]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitBtnColor={submitBtnColor}
      submitLabel={cardData.p15.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>Hey, look at the woman in this picture. It looks like she’s making</Typography>
              <Box display='flex'>
                <Dropdown
                  width='200px'
                  dropdownList={['free', 'fun']}
                  selectedValue={cardData.p15.inputs[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.p15.isSubmitted}
                  isError={cardData.p15.isSubmitted && cardData.p15.inputs[0] !== answers[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>of someone.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Typography>I know, it does look like that, but she’s actually just saying hi. In</Typography>
              <Box display='flex'>
                <Typography>certain regions of Tibet, sticking out </Typography>
                <Dropdown
                  width='200px'
                  dropdownList={['hands', 'tongue']}
                  selectedValue={cardData.p15.inputs[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.p15.isSubmitted}
                  isError={cardData.p15.isSubmitted && cardData.p15.inputs[1] !== answers[1]}
                  ariaLabel='2번 답 입력란'
                />
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box marginLeft={40} />
            <Typography>like that is a traditional way of</Typography>
            <Box display='flex'>
              <Dropdown
                width='200px'
                type='up'
                dropdownList={['meeting', 'greeting']}
                selectedValue={cardData.p15.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
              />
              <Typography>people.</Typography>
            </Box>
          </Box>
        </Box>
      </Scroll>
      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{answers.join(', ')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P15;
