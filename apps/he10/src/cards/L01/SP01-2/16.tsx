import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Typography } from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import L01SP011State from '@/cards/L01/SP01-2/store';
import L01SP012State from './store';

interface P16Props {
  pageNumber?: string;
  store?: 'SP01-1' | 'SP01-2';
}

const P16: React.FC<P16Props> = ({ pageNumber = 'p16', store = 'SP01-2' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(store === 'SP01-2' ? L01SP012State : L01SP011State);

  const PAGE_NUM = pageNumber.toUpperCase();

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-2/HE1-L01-SP01-2-P16.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['deserved to', 'in harmony', 'same routine'], []);

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
          <Label value='A' type='paint' background='var(--color-blue-100)' />
          <Typography>I still can’t believe we did it.</Typography>
          <Box display='flex' marginTop={10}>
            <Box marginTop={4}>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex' alignItems='center'>
                <Typography>Your team </Typography>
                <Dropdown
                  width='220px'
                  dropdownList={['deserved', 'deserved to']}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  selectedValue={cardData[pageNumber].inputs[0]}
                  readOnly={cardData[pageNumber].isSubmitted}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].inputs[0] !== answers[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>win. It was amazing to see all five</Typography>
              </Box>
              <Box display='flex' alignItems='center'>
                <Typography> of you dancing</Typography>
                <Dropdown
                  width='240px'
                  dropdownList={['in harmony', 'with harmony']}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  selectedValue={cardData[pageNumber].inputs[1]}
                  readOnly={cardData[pageNumber].isSubmitted}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].inputs[1] !== answers[1]}
                  ariaLabel='2번 답 입력란'
                />
                <Typography>like that.</Typography>
              </Box>
            </Box>
          </Box>

          <Box display='flex' marginTop={10}>
            <Box marginTop={4}>
              <Label value='A' type='paint' background='var(--color-blue-100)' />
            </Box>

            <Box>
              <Box display='flex' alignItems='center'>
                <Typography>It wasn’t easy: we must have done that</Typography>
                <Dropdown
                  width='230px'
                  dropdownList={['safe routine', 'same routine']}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  selectedValue={cardData[pageNumber].inputs[2]}
                  readOnly={cardData[pageNumber].isSubmitted}
                  isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].inputs[2] !== answers[2]}
                  ariaLabel='3번 답 입력란'
                  type='up'
                />
              </Box>
              <Box display='flex'>
                <Typography>a hundred times.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P16;
