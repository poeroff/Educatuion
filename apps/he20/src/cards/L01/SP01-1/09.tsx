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

const P09 = ({ _page = 'P09' }: pageType) => {
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
    audioSrc: '/L01/SP01-1/HE2-L01-SP01-1-P09.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['quickly', 'charity', 'use'], []);

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

  const isCorrect = useMemo(() => (cardData.p09.inputs as string[]).every((value, idx) => value === answers[idx]), [cardData.p09.inputs]);

  useEffect(() => {
    if (cardData.p09.isSubmitted) {
      setMark(isCorrect ? 'correct' : 'incorrect');
    }
  }, [cardData.p09.isSubmitted, isCorrect]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page.toUpperCase())?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p09: {
            ...prev.p09,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p09.inputs,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p09.inputs as string[]).every((value, idx) => value === answers[idx]);
    if (cardData.p09.isSubmitted) {
      setShow(!isShow);
      setShowAnswer(!showAnswer);
    } else {
      setCardData(prev => ({ ...prev, p09: { ...prev.p09, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p09.inputs,
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

      const newInputs = [...cardData.p09.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p09: { ...prev.p09, inputs: newInputs } }));
      changeData(_page.toUpperCase(), 1, 1, newInputs);
    },
    [cardData.p09.inputs, setOpenedIndex],
  );

  const isSubmitDisabled = useMemo(() => {
    const isEmptyInputExist = cardData.p09.inputs.some(input => input.trim() === '');
    return isEmptyInputExist;
  }, [cardData.p09.inputs]);

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
      submitLabel={cardData.p09.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={isSubmitDisabled}
    >
      <Box background={'white'} useRound>
        <Box display='flex'>
          <Box>
            <Label value='B' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Typography>Hello, Kelly. What's up?</Typography>
          </Box>
        </Box>
        <Box display='flex'>
          <Box>
            <Label value='G' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box display='flex'>
              <Typography>Hey, Jun! I just wanted to </Typography>
              <Dropdown
                width='200px'
                dropdownList={['quickly', 'politely']}
                selectedValue={cardData.p09.inputs[0]}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography>ask you something.</Typography>
            </Box>
            <Box display='flex'>
              <Typography>What are you going to bring to the</Typography>
              <Dropdown
                width='200px'
                dropdownList={['flea', 'charity']}
                selectedValue={cardData.p09.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography>market</Typography>
            </Box>
            <Box>
              <Typography>on Friday?</Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box>
            <Label value='B' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Typography>Hmm, I'm thinking of bringing something that I don't</Typography>
            <Box display='flex'>
              <Dropdown
                width='200px'
                type='up'
                dropdownList={['use', 'like']}
                selectedValue={cardData.p09.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
              />
              <Typography>anymore, but I'm not quite sure yet.</Typography>
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
            <Typography useGap={false}>남: 안녕, Kelly. 무슨 일이야?</Typography>
            <Typography useGap={false}>여: 안녕, Jun! 너에게 급히 물어보고 싶은 것이 있어. 금요일 자선 바자회에 무엇을 가져갈 거야?</Typography>
            <Typography useGap={false}>남: 음, 이제 더 이상 쓰지 않는 것을 가져갈까 하는데, 아직 잘 모르겠어.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P09;
