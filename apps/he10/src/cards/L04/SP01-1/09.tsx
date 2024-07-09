import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import L04SP011State from './store';

const P09 = ({ _page = 'P09' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP011State);

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-1/HE1-L04-SP01-1-P09.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['endangered', 'decreasing', 'production'], []);

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
      <Box useRound>
        <Box display='flex'>
          <Box marginTop={4}>
            <Label value='B' type='paint' background='var(--color-blue-100)' />
          </Box>
          <Box>
            <Typography>Oh, I had no idea there was such a day! But I read somewhere</Typography>

            <Box display='flex' alignItems='center'>
              <Typography>that bees are</Typography>
              <Dropdown
                width='200px'
                dropdownList={['in danger', 'endangered']}
                selectedValue={cardData.p09.inputs[0]}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.inputs[0] !== answers[0]}
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
              <Typography>Unfortunately, that's true. The</Typography>
              <Dropdown
                width='200px'
                dropdownList={['increasing', 'decreasing']}
                selectedValue={cardData.p09.inputs[1]}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography>number of bees is</Typography>
            </Box>
            <Typography>a serious problem, especially because about a third of the</Typography>
            <Box display='flex' alignItems='center'>
              <Typography>world's food</Typography>
              <Dropdown
                width='200px'
                dropdownList={['product', 'production']}
                selectedValue={cardData.p09.inputs[2]}
                isOpen={openedIndex === 2}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={cardData.p09.isSubmitted}
                isError={cardData.p09.isSubmitted && cardData.p09.inputs[2] !== answers[2]}
                ariaLabel='3번 답 입력란'
                type='up'
              />
              <Typography>depends on them.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P09;
