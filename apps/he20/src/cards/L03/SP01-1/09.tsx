import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, Dropdown, IAudioPlayerProps, Label, Scroll, Typography } from '@maidt-cntn/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP011State } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import L03SP011HE01102 from './components/L03SP011HE01102';

const P09 = ({ _page = 'p09' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP011State);
  const PAGE_NUM = _page.toUpperCase();

  const headerText = '[Listen & Speak] 듣기 연습';
  const questionText = '음원을 듣고 각각의 빈칸에 알맞은 단어를 고르세요.';
  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/SP01-1/HE2-L03-SP01-1-P09.mp3',
  };

  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const answers: string[] = useMemo(() => ['amazing', 'captivated', 'pattern'], []);
  const explains = useMemo(
    () => (
      <>
        <Box display='flex'>
          <Box>{`여: `}</Box>
          <Box>{`안녕, Daniel. 경복궁 투어는 어땠어?`}</Box>
        </Box>
        <Box display='flex'>
          <Box>{`남: `}</Box>
          <Box>{`정말 멋있었어! 난 전통 한국식 건물의 색채에 완전히 매료되었어. 색상 조합이 정말 아름답더라.`}</Box>
        </Box>
        <Box display='flex'>
          <Box>{`여: `}</Box>
          <Box>{`아, 단청에 대해 말하는 거지? 그 문양은 파랑, 하양, 빨강, 검정, 노랑을 조화롭게 사용해.`}</Box>
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
    <L03SP011HE01102
      headerText={headerText}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData.p09.inputs}
      answers={answers}
      explains={explains}
      isSubmitted={cardData.p09.isSubmitted}
      onSubmit={() => submitAnswer()}
    >
      <Scroll>
        <Box background={'white'} useRound>
          <Box display='flex'>
            <Box marginTop={4}>
              <Label value='W' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Typography>Hey, Daniel. How was your tour of Gyeongbok Palace?</Typography>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='M' type='paint' background='var(--color-blue-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Typography>It was </Typography>
                <Dropdown
                  width='200px'
                  dropdownList={['amazing', 'awesome']}
                  selectedValue={cardData.p09.inputs[0]}
                  isOpen={openedIndex === 0}
                  onClick={value => handleDropdownClick(0, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.inputs[0] !== answers[0]}
                  ariaLabel='1번 답 입력란'
                />
                <Typography>! </Typography>
                <Typography>I was completely </Typography>
              </Box>
              <Box display='flex'>
                <Dropdown
                  width='200px'
                  dropdownList={['captured', 'captivated']}
                  selectedValue={cardData.p09.inputs[1]}
                  isOpen={openedIndex === 1}
                  onClick={value => handleDropdownClick(1, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.inputs[1] !== answers[1]}
                  ariaLabel='2번 답 입력란'
                />
                <Typography>by the traditional Korean-style coloring of the</Typography>
              </Box>
              <Box display='flex'>
                <Typography> buildings. The color combinations were so beautiful.</Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex'>
            <Box>
              <Label value='W' type='paint' background='var(--color-yellow-100)' />
            </Box>
            <Box>
              <Box display='flex'>
                <Typography>Ah, you’re talking about dancheong, right?</Typography>
              </Box>
              <Box display='flex'>
                <Typography>The </Typography>
                <Dropdown
                  type='up'
                  width='200px'
                  dropdownList={['passion', 'pattern']}
                  selectedValue={cardData.p09.inputs[2]}
                  isOpen={openedIndex === 2}
                  onClick={value => handleDropdownClick(2, value)}
                  readOnly={cardData.p09.isSubmitted}
                  isError={cardData.p09.isSubmitted && cardData.p09.inputs[2] !== answers[2]}
                  ariaLabel='3번 답 입력란'
                />
                <Typography>uses blue, white, red, black, and yellow</Typography>
              </Box>
              <Box display='flex'>
                <Typography>colors in combination.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Scroll>
    </L03SP011HE01102>
  );
};

export default P09;
