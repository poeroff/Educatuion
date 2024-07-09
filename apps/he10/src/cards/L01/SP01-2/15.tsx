import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import L01SP011State from '@/cards/L01/SP01-2/store';
import L01SP012State from './store';

interface P15Props {
  pageNumber?: string;
  store?: 'SP01-1' | 'SP01-2';
}

const P15: React.FC<P15Props> = ({ pageNumber = 'p15', store = 'SP01-2' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP01-2' ? L01SP012State : L01SP011State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-2/HE1-L01-SP01-2-P15.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['fair share', 'hand in', 'stressed out'], []);

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            inputs: userSubmissionList[0].inputData[0]?.value || prev[pageNumber].inputs,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData[pageNumber].inputs as string[]).every((value, idx) => value === answers[idx]);
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageNumber].inputs,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUM, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
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

      const newInputs = [...cardData[pageNumber].inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], inputs: newInputs } }));
      changeData(PAGE_NUM, 1, 1, newInputs);
    },
    [cardData[pageNumber].inputs, setOpenedIndex],
  );

  return (
    <HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData[pageNumber].inputs}
      answers={answers}
      isSubmitted={cardData[pageNumber].isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Box background={'white'} border={'none'} useRound>
        <Box>
          <Typography>I thought we were getting along, but he’s not really doing</Typography>
          <Box display='flex' alignItems='center' marginTop={10}>
            <Typography>his</Typography>
            <Dropdown
              width='200px'
              dropdownList={['fair share', 'fair work']}
              selectedValue={cardData[pageNumber].inputs[0]}
              isOpen={openedIndex === 0}
              onClick={value => handleDropdownClick(0, value)}
              readOnly={cardData[pageNumber].isSubmitted}
              isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].inputs[0] !== answers[0]}
              ariaLabel='1번 답 입력란'
            />
            <Typography>. We have to</Typography>
            <Dropdown
              width='200px'
              dropdownList={['hang in', 'hand in']}
              selectedValue={cardData[pageNumber].inputs[1]}
              isOpen={openedIndex === 1}
              onClick={value => handleDropdownClick(1, value)}
              readOnly={cardData[pageNumber].isSubmitted}
              isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].inputs[1] !== answers[1]}
              ariaLabel='2번 답 입력란'
            />
            <Typography>our project in</Typography>
          </Box>
          <Box display='flex' alignItems='center' marginTop={10}>
            <Typography> two days, but he hasn’t finished his work. I’m really</Typography>
            <Dropdown
              width='220px'
              dropdownList={['stressed', 'stressed out']}
              selectedValue={cardData[pageNumber].inputs[2]}
              isOpen={openedIndex === 2}
              onClick={value => handleDropdownClick(2, value)}
              readOnly={cardData[pageNumber].isSubmitted}
              isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].inputs[2] !== answers[2]}
              ariaLabel='3번 답 입력란'
            />
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P15;