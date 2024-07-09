import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP011State } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P09 = ({ _page = 'p09' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P09.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['sphere-shaped', 'cool', 'lasts'], []);

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
          p09: {
            ...prev.p09,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p09.inputs,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p09.inputs as string[]).every((value, idx) => value === answers[idx]);
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

      const newInputs = [...cardData.p09.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p09: { ...prev.p09, inputs: newInputs } }));
      changeData(PAGE_NUM, 1, 1, newInputs);
    },
    [PAGE_NUM, cardData.p09.inputs, changeData, setCardData],
  );

  return (
    <HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData.p09.inputs}
      answers={answers}
      isSubmitted={cardData.p09.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box marginTop={4}>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>Well, my drink had a big ice ball in it. I wonder why people use </Typography>
              <Box display='flex'>
                <Typography>such a huge,</Typography>
                <Dropdown
                  width='250px'
                  dropdownList={['star-shaped', 'sphere-shaped']}
                  selectedValue={cardData.p09.inputs[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.inputs[0] !== answers[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>piece of ice.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Typography>That’s a good question. As far as I know, it can keep the drink </Typography>
              <Box display='flex'>
                <Dropdown
                  width='200px'
                  dropdownList={['cool', 'cold']}
                  selectedValue={cardData.p09.inputs[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.inputs[1] !== answers[1]}
                  ariaLabel='2번 답 입력란'
                />
                <Typography>for a longer time because that shape </Typography>
              </Box>
              <Box display='flex'>
                <Dropdown
                  width='200px'
                  type='up'
                  dropdownList={['lasts', 'resists']}
                  selectedValue={cardData.p09.inputs[2]}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.inputs[2] !== answers[2]}
                  ariaLabel='3번 답 입력란'
                />
                <Typography>longer than other shapes.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Scroll>
    </HE01102>
  );
};

export default P09;
