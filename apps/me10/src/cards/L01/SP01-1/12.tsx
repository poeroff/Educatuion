import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02201 from '@maidt-cntn/pages/HE-022-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes, TMarkType } from '@maidt-cntn/ui';
import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0101 } from './store';

const P12 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0101);

  const [mark, setMark] = useState<TMarkType>('none');

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
    audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P12.mp3',
  };

  const checkAnswerCorrect = () => {
    let isAllCorrect = true;
    let answerIndex = 0;
    cardData.p12.clickedChipButtons.map((index: number) => {
      if (cardData.p12.chipButtonInfo[index].text !== cardData.p12.answer[answerIndex++].text) {
        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            chipButtonInfo: prev.p12.chipButtonInfo.map((chipButton: IChipButtonInfo, i: number) =>
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
    if (cardData.p12.isSubmitted) {
      setMark(checkAnswerCorrect() ? 'correct' : 'incorrect');
    }
  }, [cardData.p12.isSubmitted]);

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
    const pageId = pageIds.find(page => page.page === 'p12')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p12: {
            ...prev.p12,
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData.p12.clickedChipButtons,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('p12', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = checkAnswerCorrect();
    setCardData(prev => ({ ...prev, p12: { ...prev.p12, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p12.clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('p12', userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData('p12');
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
      p12: {
        ...prev.p12,
        clickedChipButtons: clickedChipButtons,
      },
    }));
    changeData('p12', 1, 1, clickedChipButtons);
  };

  return (
    <HE02201
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      chipButtonInfo={cardData.p12.chipButtonInfo}
      answer={cardData.p12.answer}
      clickedChipButtons={cardData.p12.clickedChipButtons}
      setClickedChipButtons={setClickedChipButtons}
      isSubmitted={cardData.p12.isSubmitted}
      submitAnswer={submitAnswer}
    ></HE02201>
  );
};

export default P12;
