import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP01_1 } from './store';
import { Container } from '@maidt-cntn/ui/en';

interface pageType {
  _page?: string;
}

const P10 = ({ _page = 'P10' }: pageType) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP01_1);

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
    audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P10.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['worn out', 'baking', 'honey'], []);

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

  const isCorrect = useMemo(() => (cardData.p10.inputs as string[]).every((value, idx) => value === answers[idx]), [cardData.p10.inputs]);

  useEffect(() => {
    if (cardData.p10.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p10.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p10: {
            ...prev.p10,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p10.inputs,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p10.inputs as string[]).every((value, idx) => value === answers[idx]);
    if (cardData.p10.isSubmitted) {
      setShow(!isShow);
      setShowAnswer(!showAnswer);
    } else {
      setCardData(prev => ({ ...prev, p10: { ...prev.p10, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p10.inputs,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult(_page.toUpperCase(), userSubmission, isCorrect);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page.toUpperCase());
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

      const newInputs = [...cardData.p10.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p10: { ...prev.p10, inputs: newInputs } }));
      changeData(_page.toUpperCase(), 1, 1, newInputs);
    },
    [cardData.p10.inputs, setOpenedIndex],
  );

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.p10.inputs.some(input => input.trim() === '');
    return isEmptyInputExist;
  }, [cardData.p10.inputs]);

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
      submitLabel={cardData.p10.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Box background={'white'} useRound>
        <Box display='flex'>
          <Box>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Typography>Well, I've had a look around my room for used things, but</Typography>
            <Box display='flex'>
              <Typography> everything is too</Typography>
              <Dropdown
                width='200px'
                dropdownList={['went out', 'worn out']}
                selectedValue={cardData.p10.inputs[0]}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography>. So, I'm thinking of</Typography>
            </Box>
            <Box display='flex'>
              <Dropdown
                width='200px'
                dropdownList={['making', 'baking']}
                selectedValue={cardData.p10.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography>some cookies instead. What do you think?</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Label value='B' type='paint' background='var(--color-blue-100)' />
          <Typography>That sounds great! What kind of cookies?</Typography>
        </Box>
        <Box display='flex'>
          <Box>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box display='flex'>
              <Typography>Probably banana cookies with</Typography>
              <Dropdown
                width='200px'
                type='up'
                dropdownList={['honey', 'chocolate']}
                selectedValue={cardData.p10.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
              />
              .
            </Box>
            <Box>
              <Typography> They're my favorite.</Typography>
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
              여: 음, 썼던 물건들을 찾으려고 방을 둘러봤지만 다 너무 낡았더라고. 그래서 대신에 쿠키를 좀 구워갈까 생각 중이야. 어떻게 생각해?
            </Typography>
            <Typography useGap={false}>남: 좋은 생각이네! 어떤 쿠키인데?</Typography>
            <Typography useGap={false}>여: 아마도 꿀이 들어간 바나나 쿠키. 내가 제일 좋아하는 거야.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P10;
