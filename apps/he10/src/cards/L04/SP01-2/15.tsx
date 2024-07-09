import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { Box, Dropdown, IAudioPlayerProps, Label, Typography } from '@maidt-cntn/ui';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import L04SP012State from './store';

const P15 = ({ _page = 'P15' }: { _page?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04SP012State);

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈 칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/SP01-2/HE1-L04-SP01-2-P15.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['preferred', 'confirm', 'unwanted'], []);

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
          p15: {
            ...prev.p15,
            inputs: userSubmissionList[0].inputData[0]?.value || prev.p15.inputs,
            isSubmitted,
          },
        }));
      }
      initData(_page.toUpperCase(), userSubmissionList, defaultSubmission, isSubmitted);
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

      const newInputs = [...cardData.p15.inputs];
      newInputs[index] = value;

      setCardData(prev => ({ ...prev, p15: { ...prev.p15, inputs: newInputs } }));
      changeData(_page.toUpperCase(), 1, 1, newInputs);
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
      <Box background={'white'} useRound display='flex' alignItems='start'>
        <Box>
          <Label value='M' type='paint' background='var(--color-blue-100)' />
        </Box>
        <Box>
          <Box display='flex'>
            <Box display='flex' vAlign='center'>
              <Typography>Just visit our website and choose your</Typography>
            </Box>
            <Dropdown
              width='fit-content'
              dropdownList={['preferred', 'predicted']}
              selectedValue={cardData.p15.inputs[0]}
              isOpen={openedIndex === 0}
              onClick={value => handleDropdownClick(0, value)}
              ariaLabel='1번 답 입력란'
              readOnly={cardData.p15.isSubmitted}
              isError={cardData.p15.isSubmitted && cardData.p15.inputs[0] !== answers[0]}
            />
            <Box display='flex' vAlign='center'>
              <Typography>pick-up</Typography>
            </Box>
          </Box>
          <Box display='flex'>
            <Typography>date. We'll </Typography>
            <Dropdown
              width='fit-content'
              dropdownList={['confirm', 'consider']}
              isOpen={openedIndex === 1}
              onClick={value => handleDropdownClick(1, value)}
              selectedValue={cardData.p15.inputs[1]}
              ariaLabel='2번 답 입력란'
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[1] !== answers[1]}
            />
            <Typography>the date of our visit and then come to</Typography>
          </Box>
          <Box display='flex'>
            <Typography>your home and pick up your</Typography>
            <Dropdown
              width='fit-content'
              dropdownList={['wanted', 'unwanted']}
              isOpen={openedIndex === 2}
              onClick={value => handleDropdownClick(2, value)}
              selectedValue={cardData.p15.inputs[2]}
              ariaLabel='3번 답 입력란'
                readOnly={cardData.p15.isSubmitted}
                isError={cardData.p15.isSubmitted && cardData.p15.inputs[2] !== answers[2]}
                type='up'
            />
            <Typography>appliances.</Typography>
          </Box>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P15;
