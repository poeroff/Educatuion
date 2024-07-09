import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02201 from '@maidt-cntn/pages/HE-022-01';
import { Box, IQuestionProps, TMainHeaderInfoTypes, TMarkType, Typography } from '@maidt-cntn/ui';
import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0302 } from './store';

const P17 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0302);
  const [mark, setMark] = useState<TMarkType>('none');

  const pageNo = 'P17';
  const pageKey = 'p17';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '영작 연습',
  };

  const questionInfo: IQuestionProps = {
    text: '단어카드를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    mark: mark,
  };

  const messageInfo = (
    <Box useFull flexDirection='column' hAlign='center' gap='48px' width={920}>
      <Box width='685px' height='80px' margin='30px 30px' hAlign='center' vAlign='center' background='white' useRound>
        <Typography>I look in the mirror and say, "Just be you!"</Typography>
      </Box>
    </Box>
  );

  const checkAnswerCorrect = () => {
    let isAllCorrect = true;
    let answerIndex = 0;
    cardData[pageKey].clickedChipButtons.map((index: number) => {
      if (cardData[pageKey].chipButtonInfo[index].text !== cardData[pageKey].answer[answerIndex++].text) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            chipButtonInfo: prev[pageKey].chipButtonInfo.map((chipButton: IChipButtonInfo, i: number) =>
              i === index ? { ...chipButton, isError: true } : chipButton,
            ),
          },
        }));
        isAllCorrect = false;
      }
    });
    return isAllCorrect;
  };

  useEffect(() => {
    if (cardData[pageKey].isSubmitted) {
      setMark(checkAnswerCorrect() ? 'correct' : 'incorrect');
    }
  }, [cardData[pageKey].isSubmitted]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].clickedChipButtons,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].inputData[0]?.isCorrect : false,
          },
        }));
      }
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = checkAnswerCorrect();
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData[pageKey].clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const setClickedChipButtons = (clickedChipButtons: number[]) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        clickedChipButtons: clickedChipButtons,
      },
    }));
    changeData(pageNo, 1, 1, clickedChipButtons);
  };

  return (
    <HE02201
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      messageInfo={messageInfo}
      chipButtonInfo={cardData[pageKey].chipButtonInfo}
      answer={cardData[pageKey].answer}
      clickedChipButtons={cardData[pageKey].clickedChipButtons}
      setClickedChipButtons={setClickedChipButtons}
      isSubmitted={cardData[pageKey].isSubmitted}
      submitAnswer={submitAnswer}
    ></HE02201>
  );
};

export default P17;
