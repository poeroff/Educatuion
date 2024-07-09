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

const P15 = () => {
  const PAGE_NUMBER = 'P15';
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
    audioSrc: '/L01/SP01-2/HE2-L01-SP01-2-P15.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['wildlife', 'safely', 'habitats'], []);

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

  const isCorrect = useMemo(() => (cardData.p15.inputs as string[]).every((value, idx) => value === answers[idx]), [cardData.p15.inputs]);

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
    const isCorrect = (cardData.p15.inputs as string[]).every((value, idx) => value === answers[idx]);
    if (cardData.p15.isSubmitted) {
      setShow(!isShow);
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
      <Box background={'white'} useRound>
        <Box display='flex'>
          <Box>
            <Label value='G' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>Hey, Mike, take a look at this picture. Can you guess what it is?</Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box>
            <Label value='B' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>Isn’t it just a bridge over a road?</Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box>
            <Label value='G' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>Actually, it’s a</Typography>
              <Dropdown
                width='200px'
                dropdownList={['wildlife', 'wild']}
                selectedValue={cardData.p15.inputs[0]}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography lineHeight='48px'>crossing: a kind of bridge that</Typography>
            </Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>allows animals to cross roads</Typography>
              <Dropdown
                width='200px'
                type='up'
                dropdownList={['safe', 'safely']}
                selectedValue={cardData.p15.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              .<Typography lineHeight='48px'>It’s built to restore</Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginLeft={40} />
          <Box display='flex'>
            <Typography lineHeight='48px'>and reconnect</Typography>
            <Dropdown
              width='200px'
              type='up'
              dropdownList={['habitats', 'roads']}
              selectedValue={cardData.p15.inputs[2]}
              isOpen={openedIndex === 2}
              onClick={value => handleDropdownClick(2, value)}
              readOnly={cardData.p15.isSubmitted}
              isError={cardData.p15.isSubmitted && cardData.p15.inputs[2] !== answers[2]}
              ariaLabel='3번 답 입력란'
            />
            <Typography lineHeight='48px'>that have been separated due to</Typography>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginLeft={40} />
          <Box>
            <Box display='flex'>
              <Typography lineHeight='48px'>road construction.</Typography>
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
            <Typography useGap={false}>여: Mike, 이 사진 좀 봐. 무엇인지 알아맞힐 수 있겠어?</Typography>
            <Typography useGap={false}>남: 그냥 도로 위의 다리 아니야?</Typography>
            <Typography useGap={false}>
              여: 사실 그것은 야생 동물 이동통로인데, 야생 동물이 안전하게 도로를 건널 수 있게 해주는 다리지. 그것은 도로 건설로 인해 분리된 서식지를
              복구하고 다시 연결하기 위해 만들어졌어.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P15;
