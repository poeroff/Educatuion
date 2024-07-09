import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02201 from '@maidt-cntn/pages/HE-022-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, TMarkType } from '@maidt-cntn/ui';
import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0102 } from './store';

const P20 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0102);
  const [mark, setMark] = useState<TMarkType>('none');

  const pageNumber = 'P20';
  const pageKey = 'p20';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '듣기 연습',
  };

  const questionInfo: IQuestionProps = {
    text: '음원을 듣고 단어카드를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해 봅시다.',
    mark: mark,
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/SP01-2/ME1-L01-SP01-2-P20.mp3',
  };

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
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].clickedChipButtons,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
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

  const setClickedChipButtons = (clickedChipButtons: number[]) => {
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        clickedChipButtons: clickedChipButtons,
      },
    }));
    changeData(pageNumber, 1, 1, clickedChipButtons);
  };

  return (
    <HE02201
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      chipButtonInfo={cardData[pageKey].chipButtonInfo}
      answer={cardData[pageKey].answer}
      clickedChipButtons={cardData[pageKey].clickedChipButtons}
      setClickedChipButtons={setClickedChipButtons}
      isSubmitted={cardData[pageKey].isSubmitted}
      submitAnswer={submitAnswer}
    ></HE02201>
  );
};

export default P20;
