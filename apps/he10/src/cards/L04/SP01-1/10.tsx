import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP011State from './store';

const P10 = ({ _page = 'P10' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP011State);

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE1-L04-SP01-1-P10.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['concerned', 'graph', 'steadily'], []);

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
      <Box background={'white'} border={'none'} useRound>
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='B' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography>Kate, what's on your mind? You look a bit</Typography>
              <Dropdown
                width='200px'
                dropdownList={['consumed', 'concerned']}
                selectedValue={cardData.p10.inputs[0]}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Typography>.</Typography>
            </Box>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginTop={8}>
            <Label value='G' type='paint' background='var(--color-yellow-100)' />
          </Box>
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography>I’m just looking at a</Typography>
              <Dropdown
                width='200px'
                dropdownList={['graph', 'graphics']}
                selectedValue={cardData.p10.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography>of the sea level. Here, take</Typography>
            </Box>
            <Typography>a look.</Typography>
          </Box>
        </Box>
        <Box display='flex'>
          <Box marginTop={8}>
            <Label value='B' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography>Hmm, it seems to be rising</Typography>
              <Dropdown
                width='200px'
                dropdownList={['steadily', 'slowly']}
                selectedValue={cardData.p10.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p10.isSubmitted}
                isError={cardData.p10.isSubmitted && cardData.p10.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
                type='up'
              />
              <Typography>but with some ups</Typography>
            </Box>
            <Typography>and downs.</Typography>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P10;
