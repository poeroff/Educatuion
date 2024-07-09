import HE03701SP from '@maidt-cntn/pages/HE-037-01-SP';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, IQuestionProps, List, Radio, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01SCP0402 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const DEFAULT_PAGE_KEY = 'P14';

interface P14Props {
  pageKey?: string;
}

const P14 = ({ pageKey = DEFAULT_PAGE_KEY }: P14Props) => {
  const storeKey = DEFAULT_PAGE_KEY;
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0402);
  const { userId } = useRecoilValue(studentAtom);
  const choices = ['Am', 'Are', 'Is'];
  const wordNode = [
    <Typography key='wordNode' fontSize='var(--font-size-36)' weight='var(--font-weight-bold)'>
      <Typography type='blank' width='70px' title='빈칸' boxColor='var(--color-black)' /> you a student?
    </Typography>,
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '어법 연습',
  };

  const questionInfo: IQuestionProps = {
    text: <Typography fontSize='var(--font-size-32)'>빈칸에 들어갈 알맞은 단어를 골라 봅시다.</Typography>,
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

  const handleRadioClick = (index: number) => {
    if (cardData[storeKey].isSubmitted) return;
    setCardData(prev => ({
      ...prev,
      [storeKey]: {
        ...prev[storeKey],
        answer: choices?.[index],
      },
    }));
    changeData(pageKey, 1, 1, choices?.[index]);
  };

  const nodes: React.ReactNode[] = [
    <List
      key='list'
      align='horizontal'
      data={choices}
      gap={25}
      row={({ value, index = 1 }) => (
        <Box width='286px' textAlign='center'>
          <Radio
            type='box'
            align='vertical'
            label={value}
            ariaLabel={`${index}번째 답 버튼`}
            value={value === cardData[storeKey].answer}
            onClick={() => handleRadioClick(index - 1)}
            isError={cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect}
            readOnly={cardData[storeKey].isSubmitted}
          >
            {value}
          </Radio>
        </Box>
      )}
    />,
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
      choices={choices}
      answers={cardData[storeKey].answer}
      nodes={nodes}
      wordNode={wordNode}
      solution={cardData[storeKey].solution}
      submitted={cardData[storeKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

export default P14;
