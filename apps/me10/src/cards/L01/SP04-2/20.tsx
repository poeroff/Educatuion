import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE02201 from '@maidt-cntn/pages/HE-022-01';
import { IQuestionProps, TMainHeaderInfoTypes, TMarkType, Typography, Box } from '@maidt-cntn/ui';
import { IChipButtonInfo } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0402 } from './store';

const DEFAULT_PAGE_KEY = 'P20';

interface P20Props {
  pageKey?: string;
}

const P20 = ({ pageKey = DEFAULT_PAGE_KEY }: P20Props) => {
  const storeKey = DEFAULT_PAGE_KEY;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0402);
  const [mark, setMark] = useState<TMarkType>('none');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '문장쓰기 연습',
  };

  const questionInfo: IQuestionProps = {
    text: '우리말 뜻을 보고, 단어를 알맞게 배열하여 문장을 만들어 봅시다.',
    mark: mark,
  };

  const messageInfo = (
    <Box marginBottom='24px' useRound height='80px' background='white' padding='10px' useFull hAlign='center'>
      <Typography>아빠는 오렌지 주스를 마신다. </Typography>
    </Box>
  );

  const checkAnswerCorrect = () => {
    let isAllCorrect = true;
    let answerIndex = 0;
    cardData[storeKey].clickedChipButtons.map((index: number) => {
      if (cardData[storeKey].chipButtonInfo[index].text !== cardData[storeKey].solution[answerIndex++].text) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            chipButtonInfo: prev[storeKey].chipButtonInfo.map((chipButton: IChipButtonInfo, i: number) =>
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
    if (cardData[storeKey].isSubmitted) {
      setMark(checkAnswerCorrect() ? 'correct' : 'incorrect');
    }
  }, [cardData[storeKey].isSubmitted]);

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
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            clickedChipButtons: userSubmissionList[0].inputData[0]?.value || cardData[storeKey].clickedChipButtons,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    const isCorrect = checkAnswerCorrect();
    setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData[storeKey].clickedChipButtons,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  useEffect(() => {
    return () => {
      saveData(pageKey);
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
      [storeKey]: {
        ...prev[storeKey],
        clickedChipButtons: clickedChipButtons,
      },
    }));
    changeData(pageKey, 1, 1, clickedChipButtons);
  };

  return (
    <HE02201
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      chipButtonInfo={cardData[storeKey].chipButtonInfo}
      answer={cardData[storeKey].solution}
      clickedChipButtons={cardData[storeKey].clickedChipButtons}
      setClickedChipButtons={setClickedChipButtons}
      isSubmitted={cardData[storeKey].isSubmitted}
      messageInfo={messageInfo}
      submitAnswer={submitAnswer}
    ></HE02201>
  );
};

export default P20;
