import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, Dropdown, IAudioPlayerProps, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE01102 from '@maidt-cntn/pages/HE-011-02';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0101 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { isValidString } from '@maidt-cntn/util/CommonUtil';

const P09 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0101);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const pageNumber = 'P09';
  const pageKey = 'p09';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '듣기 연습',
  };

  const questionText = '음원을 듣고 빈칸에 알맞은 단어를 고르세요.';

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P09.mp3',
    captionSrc: '/L01/SP01-1/ME1-L01-SP01-1-P09.srt',
  };

  const handleClickDropdown = (value?: string) => {
    if (value !== null && value !== undefined && isValidString(value)) {
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
      changeData(pageNumber, 1, 1, cardData[pageKey].answer);
      setIsSelecting(false);
    } else {
      setIsSelecting(!isSelecting);
    }
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: [],
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = cardData[pageKey].answer === cardData[pageKey].solution;
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <HE01102
      headerInfoProps={headerInfo}
      questionText={questionText}
      audioInfo={audioInfo}
      userInputs={cardData[pageKey].answer.length > 0 ? [cardData[pageKey].answer] : ['']}
      answers={[cardData[pageKey].solution]}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
      isSelecting={isSelecting}
    >
      <Box marginTop='15px'>
        <Box hAlign='flex-start'>
          <Box marginRight='8px' alignSelf='start'>
            <Label value={'A'} type={'paint'} background='var(--color-blue-100)' />
            <Typography>What’s your favorite food?</Typography>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' marginTop={10}>
          <Label value={'B'} type={'paint'} background='var(--color-yellow-100)' />
          <Typography>My</Typography>
          <Dropdown
            dropdownList={cardData[pageKey].inputs}
            width='240px'
            onClick={handleClickDropdown}
            aria-label='값을 선택하세요.'
            disabled={cardData[pageKey].isSubmitted}
            isError={cardData[pageKey].isSubmitted && cardData[pageKey].answer !== cardData[pageKey].solution}
            selectedValue={cardData[pageKey].answer.length > 0 ? cardData[pageKey].answer : ''}
          />{' '}
          <Typography>food is apples.</Typography>
        </Box>
      </Box>
    </HE01102>
  );
};

export default P09;
