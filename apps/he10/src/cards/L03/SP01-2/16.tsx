import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L03SP012State from './store';

const P16 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP012State);

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 빈 칸에 들어갈 알맞은 표현을 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-2/HE1-L03-SP01-2-P16.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['renowned', 'largest', 'auditory'], []);

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
    const pageId = pageIds.find(page => page.page === 'P16')?.pageId;
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
      initData('P16', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p16.inputs as string[]).every((value, idx) => value === answers[idx]);
    setCardData(prev => ({ ...prev, p16: { ...prev.p16, isSubmitted: true, isCorrect: isCorrect } }));
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
    submitDataWithResult('P16', userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData('P16');
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
      changeData('P16', 1, 1, newInputs);
    },
    [cardData.p16.inputs, setOpenedIndex],
  );

  return (
    <HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData.p16.inputs}
      answers={answers}
      isSubmitted={cardData.p16.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Box useRound>
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='M' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography>Welcome to St.Paul's Cathedral in London. This is a beautiful</Typography>
              {/* <Dropdown
                width='200px'
                dropdownList={['known', 'renowned']}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                selectedValue={cardData.p16.inputs[0]}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              /> */}
            </Box>
            <Box display='flex' alignItems='center'>
              <Typography>place</Typography>
              <Dropdown
                width='200px'
                dropdownList={['known', 'renowned']}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                selectedValue={cardData.p16.inputs[0]}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography>for its stunning architecture,</Typography>
            </Box>

            <Box display='flex' alignItems='center'>
              <Typography>including one of the</Typography>
              <Dropdown
                width='220px'
                dropdownList={['larger', 'largest']}
                selectedValue={cardData.p16.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography>domes in the world.</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <Typography>This grand dome gives you a unique</Typography>
              <Dropdown
                width='200px'
                dropdownList={['auditory', 'visual']}
                selectedValue={cardData.p16.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
                type='up'
              />
              <Typography>experience.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P16;
