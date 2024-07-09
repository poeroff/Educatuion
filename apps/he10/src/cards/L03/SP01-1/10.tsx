import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { L03SP011State } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P10 = ({ _page = 'p10' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE1-L03-SP01-1-P10.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['turns', 'active', 'resting'], []);

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
          p10: {
            ...prev.p10,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p10.inputs,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p10.inputs as string[]).every((value, idx) => value === answers[idx]);
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

      const newInputs = [...cardData.p10.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p10: { ...prev.p10, inputs: newInputs } }));
      changeData(PAGE_NUM, 1, 1, newInputs);
    },
    [PAGE_NUM, cardData.p10.inputs, changeData, setCardData],
  );

  return (
    <HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData.p10.inputs}
      answers={answers}
      isSubmitted={cardData.p10.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box marginTop={4}>
              <Label value='B' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box>
                <Typography>What do you mean? I don’t really notice them taking </Typography>
              </Box>
              <Box display='flex'>
                <Dropdown
                  width='200px'
                  dropdownList={['turns', 'time']}
                  selectedValue={cardData.p10.inputs[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.inputs[0] !== answers[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>.</Typography>
              </Box>

              <Box display='flex'>
                <Typography>It feels like both of them are </Typography>
                <Dropdown
                  width='200px'
                  dropdownList={['active', 'acting']}
                  selectedValue={cardData.p10.inputs[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.inputs[1] !== answers[1]}
                  ariaLabel='2번 답 입력란'
                />
                <Typography>right now.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Typography>I mean, one of the openings rests, but not fully. So, it keeps </Typography>
              <Box display='flex'>
                <Typography>doing essential functions even while </Typography>
                <Dropdown
                  width='200px'
                  type='up'
                  dropdownList={['working', 'resting']}
                  selectedValue={cardData.p10.inputs[2]}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.inputs[2] !== answers[2]}
                  ariaLabel='3번 답 입력란'
                />
                <Typography>.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Scroll>
    </HE01102>
  );
};

export default P10;
