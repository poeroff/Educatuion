import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L01SP01_2 } from '@/cards/L01/SP01-2/store';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BottomSheet,
  Box,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  TMarkType,
  Typography,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';

const P16 = () => {
  const PAGE_NUMBER = 'P16';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP01_2);

  const [mark, setMark] = useState<TMarkType>('none');
  const [isShow, setShow] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 듣기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.',
    markSize: 'middle',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-2/HE2-L01-SP01-2-P16.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['significance', 'access', 'well-being'], []);

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

  const isCorrect = useMemo(() => (cardData.p16.inputs as string[]).every((value, idx) => value === answers[idx]), [cardData.p16.inputs]);

  useEffect(() => {
    if (cardData.p16.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p16.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p16: {
            ...prev.p16,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p16.inputs,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p16.inputs as string[]).every((value, idx) => value === answers[idx]);
    if (cardData.p16.isSubmitted) {
      setShow(!isShow);
      setShowAnswer(!showAnswer);
    } else {
      setCardData(prev => ({ ...prev, p16: { ...prev.p16, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p16.inputs,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect: isCorrect,
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

      const newInputs = [...cardData.p16.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p16: { ...prev.p16, inputs: newInputs } }));
      changeData(PAGE_NUMBER, 1, 1, newInputs);
    },
    [cardData.p16.inputs, setOpenedIndex],
  );

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.p16.inputs.some(input => input.trim() === '');
    return isEmptyInputExist;
  }, [cardData.p16.inputs]);

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
      submitLabel={cardData.p16.isSubmitted ? (showAnswer ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Box background={'white'} useRound>
        <Box display='flex'>
          <Box>
            <Label value='M' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>It’s important to recognize the</Typography>
              <Dropdown
                width='200px'
                dropdownList={['instance', 'significance']}
                selectedValue={cardData.p16.inputs[0]}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography lineHeight='48px'>of this project.</Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginLeft={38} />
          <Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>Countless homeless animals suffer from serious illnesses,</Typography>
            </Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>without any</Typography>
              <Dropdown
                width='200px'
                dropdownList={['access', 'adopt']}
                selectedValue={cardData.p16.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography lineHeight='48px'>to proper medical care.</Typography>
            </Box>
            <Box>
              <Typography lineHeight='48px'>By supporting the Vet Bus project, you can help improve the </Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginLeft={38} />
          <Box>
            <Box display='flex'>
              <Dropdown
                width='220px'
                type='up'
                dropdownList={['surroundings', 'well-being']}
                selectedValue={cardData.p16.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
              />
              <Typography lineHeight='48px'>of homeless animals and also create healthier</Typography>
            </Box>
            <Box>
              <Typography lineHeight='48px'>environments.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false}>{answers.join(' - ')}</Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography useGap={false}>
              남: 이 프로젝트의 중요성을 인식하는 것은 중요합니다. 적절한 의료 보살핌을 전혀 받지 못한 채, 셀 수 없이 많은 집 없는 동물들이 심각한
              질병으로 고통받고 있습니다. Vet Bus 프로젝트를 후원함으로써 여러분은 집 없는 동물들의 건강을 개선하고 더 건강한 환경을 조성하는 데에도
              도움을 줄 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P16;
