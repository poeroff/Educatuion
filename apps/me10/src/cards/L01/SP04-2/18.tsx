import HE03701SP from '@maidt-cntn/pages/HE-037-01-SP';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, IQuestionProps, Input, InputStatus, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SCP0402 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const DEFAULT_PAGE_KEY = 'P18';

interface P18Props {
  pageKey?: string;
}

const P18 = ({ pageKey = DEFAULT_PAGE_KEY }: P18Props) => {
  const storeKey = DEFAULT_PAGE_KEY;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0402);
  const { userId } = useRecoilValue(studentAtom);
  const wordNode = [
    <Typography key='wordNode' fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
      He
      <Typography textDecoration='underline' fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
        don't
      </Typography>
      like mint chocolate.
    </Typography>,
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '문장쓰기 연습',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.</Typography>,
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer: userSubmissionList[0].inputData[0]?.value || prev[storeKey]?.answer,
            isCorrect: userSubmissionList[0].isCorrect,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData[storeKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageKey, userSubmission, isCorrect);
  };

  const handleChange = (value: string) => {
    if (cardData[storeKey].isSubmitted) return;
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({
      ...prev,
      [storeKey]: {
        ...prev[storeKey],
        answer: truncateValue,
      },
    }));
    changeData(pageKey, 1, 1, truncateValue);
  };

  const nodes: React.ReactNode[] = [
    <Box key='nodes' hAlign='center' useFull>
      <Input
        width='450px'
        ariaLabel='답란'
        placeholder='내용을 넣어 주세요.'
        onChange={e => handleChange(e.target.value)}
        value={cardData[storeKey].answer}
        readOnly={cardData[storeKey].isSubmitted}
        maxLength={2000}
        status={
          cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect && !isAnswer(cardData[storeKey].answer, cardData[storeKey].solution)
            ? InputStatus.ERROR
            : isNotEmptyString(cardData[storeKey].answer)
            ? InputStatus.ENABLE
            : InputStatus.DEFAULT
        }
      />
    </Box>,
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

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

  return (
    <HE03701SP
      questionInfo={questionInfo}
      headerInfo={headerInfo}
      answers={cardData[storeKey].answer}
      nodes={nodes}
      wordNode={wordNode}
      solution={cardData[storeKey].solution}
      submitted={cardData[storeKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P18;
