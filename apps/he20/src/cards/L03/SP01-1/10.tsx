import { Box, Dropdown, IAudioPlayerProps, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { L03SP011State } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import L03SP011HE01102 from './components/L03SP011HE01102';

const P10 = ({ _page = 'p10' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 빈칸에 들어갈 알맞은 표현을 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P10.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['funny', 'impressed', 'acting'], []);
  const explains = useMemo(
    () => (
      <>
        <Box display='flex'>
          <Box>{`여: `}</Box>
          <Box>{`정말 웃기더라. 시작부터 끝까지 계속 웃었어. 난 George Nicholson의 연기에 정말 감명받았어.`}</Box>
        </Box>
        <Box display='flex'>
          <Box>{`남: `}</Box>
          <Box>{`동의해! 코미디 연기는 정말 어렵다고 생각하는데, 그는 정말 잘했어.`}</Box>
        </Box>
        <Box display='flex'>
          <Box>{`여: `}</Box>
          <Box>{`정말로! 나는 심지어 다시 보러 갈까 생각 중이야.`}</Box>
        </Box>
      </>
    ),
    [],
  );

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
  }, [saveData]);

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
    <L03SP011HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData.p10.inputs}
      answers={answers}
      explains={explains}
      isSubmitted={cardData.p10.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box marginTop={4}>
              <Label value='G' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Typography>It was so </Typography>
                <Dropdown
                  width='200px'
                  dropdownList={['fun', 'funny']}
                  selectedValue={cardData.p10.inputs[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.inputs[0] !== answers[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>. I laughed from the start to the very</Typography>
              </Box>
              <Box display='flex'>
                <Typography>end. I was really </Typography>
                <Dropdown
                  width='200px'
                  dropdownList={['surprised', 'impressed']}
                  selectedValue={cardData.p10.inputs[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.inputs[1] !== answers[1]}
                  ariaLabel='2번 답 입력란'
                />
                <Typography>by George Nicholson’s</Typography>
              </Box>
              <Typography>performance.</Typography>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='B' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Typography>I agree! I think comedy doing essential functions even while</Typography>
              <Box display='flex'>
                <Dropdown
                  type='up'
                  width='200px'
                  dropdownList={['acting', 'activity']}
                  selectedValue={cardData.p10.inputs[2]}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  readOnly={cardData.p10.isSubmitted}
                  isError={cardData.p10.isSubmitted && cardData.p10.inputs[2] !== answers[2]}
                  ariaLabel='3번 답 입력란'
                />
                <Typography>is very difficult, but he did a great job.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='G' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>Absolutely! I’m even thinking about going to see it again.</Typography>
            </Box>
          </Box>
        </Box>
      </Scroll>
    </L03SP011HE01102>
  );
};

export default P10;
