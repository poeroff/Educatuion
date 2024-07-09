import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Typography, Label } from '@maidt-cntn/ui';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import L04SP012State from './store';

const P09 = ({ _page = 'P16' }: { _page?: string }) => {
  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-2/HE1-L04-SP01-2-P16.mp3',
  };

  const answers: string[] = useMemo(() => ['climate', 'impact', 'recovering'], []);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP012State);

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

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
          p16: {
            ...prev.p16,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p16.inputs,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
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

      const newInputs = [...cardData.p16.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p16: { ...prev.p16, inputs: newInputs } }));
      changeData(_page.toUpperCase(), 1, 1, newInputs);
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
      <Box background={'white'} useRound  display='flex' alignItems='start'>
        <Box>
          <Label value='W' type='paint' background='var(--color-blue-100)' />
        </Box>
        <Box>
          <Box>
            <Box display='flex'>
              <Box display='flex' vAlign='center'>
                <Typography>You’ve probably heard a lot of news about</Typography>
              </Box>
              <Dropdown
                width='fit-content'
                dropdownList={['climate', 'weather']}
                isOpen={openedIndex === 0}
                onClick={value => handleDropdownClick(0, value)}
                selectedValue={cardData.p16.inputs[0]}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[0] !== answers[0]}
                ariaLabel='1번 답 입력란'
              />
              <Box display='flex' vAlign='center'>
                <Typography>change,</Typography>
              </Box>
            </Box>
            <Box display='flex'>
              <Typography>and you’re worried about its</Typography>
              <Dropdown
                width='230px'
                dropdownList={['effect', 'impact']}
                isOpen={openedIndex === 1}
                onClick={value => handleDropdownClick(1, value)}
                selectedValue={cardData.p16.inputs[1]}
                readOnly={cardData.p16.isSubmitted}
                isError={cardData.p16.isSubmitted && cardData.p16.inputs[1] !== answers[1]}
                ariaLabel='2번 답 입력란'
              />
              <Typography>on the future of</Typography>
            </Box>
          </Box>

          <Typography> our planet. But today, I have some good news to share! According</Typography>
          
          <Box display='flex'>
            <Typography>to the United Nations, the ozone layer is</Typography>
            <Dropdown
              width='230px'
              dropdownList={['recovering', 'responding']}
              isOpen={openedIndex === 2}
              onClick={value => handleDropdownClick(2, value)}
              selectedValue={cardData.p16.inputs[2]}
              readOnly={cardData.p16.isSubmitted}
              isError={cardData.p16.isSubmitted && cardData.p16.inputs[2] !== answers[2]}
              ariaLabel='3번 답 입력란'
              type='up'
            />
            <Typography>.</Typography>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P09;
