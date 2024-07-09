import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L03SP012State from './store';

const P15 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP012State);

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 빈 칸에 들어갈 알맞은 표현을 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-2/HE1-L03-SP01-2-P15.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['released', 'automatically', 'could'], []);

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
    const pageId = pageIds.find(page => page.page === 'P15')?.pageId;
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
      initData('P15', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = (cardData.p15.inputs as string[]).every((value, idx) => value === answers[idx]);
    setCardData(prev => ({ ...prev, p15: { ...prev.p15, isSubmitted: true, isCorrect: isCorrect } }));
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
    submitDataWithResult('P15', userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData('P15');
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
      changeData('P15', 1, 1, newInputs);
    },
    [cardData.p15.inputs, setOpenedIndex],
  );

  return (
    <HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData.p15.inputs}
      answers={answers}
      isSubmitted={cardData.p15.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Box useRound>
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography>A network of tubes and sprayers </Typography>
              <Dropdown
                width='220px'
                dropdownList={['released', 'relieved']}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                selectedValue={cardData.p15.inputs[0]}
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography>soapy water</Typography>
            </Box>
            <Typography>all over the house, including the floors, walls, and ceilings.</Typography>
          </Box>
        </Box>
        <Box>
          {/* <Label value='A' type='paint' background='var(--color-blue-100)' /> */}
          <Box display='flex' marginLeft='37px'>
            <Typography>After that, the system</Typography>
            <Dropdown
              width='220px'
              dropdownList={['instantly', 'automatically']}
              selectedValue={cardData.p15.inputs[1]}
              isOpen={openedIndex === 1}
              onClick={value => handleDropdownClick(1, value)}
              readOnly={cardData.p15.isSubmitted}
              isError={cardData.p15.isSubmitted && cardData.p15.inputs[1] !== answers[1]}
              ariaLabel='2번 답 입력란'
            />
            <Typography>washed away</Typography>
          </Box>
          <Box display='flex' marginLeft='37px'>
            <Typography>the dirty water.</Typography>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='B' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography>That's amazing. I wish I</Typography>
              <Dropdown
                width='200px'
                dropdownList={['could', 'would']}
                selectedValue={cardData.p15.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
                type='up'
              />
              <Typography>live in that house.</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <Typography>Then I would never have to clean my room!</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P15;
