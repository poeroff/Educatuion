import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from '@/cards/L01/SP03-1/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, BoxWrap, IQuestionProps, Label, List, Radio, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import HE02901, { IContentList, ISolution } from '@maidt-cntn/pages/HE-029-01-API';

const P16 = ({ pageNo = 'P16' }: { pageNo?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);

  const pageKey = 'p16';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: '3. 다음 글을 읽고, (A)~(C)를 순서대로 알맞게 배열한 것을 고르시오.',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const choices = ['(A) - (B) - (C)', '(A) - (C) - (B)', '(B) - (A) - (C)', '(C) - (A) - (B)', '(C) - (B) - (A)'];

  const paragraphTemplate = (label: string, text: string) => {
    return (
      <Box display={'flex'}>
        <Typography>{label}</Typography>
        <Typography>{text}</Typography>
      </Box>
    );
  };

  const problem = {
    paragraph: (
      <>
        {paragraphTemplate('(A)', ' Also, I have many pens. I love colors!')}
        {paragraphTemplate('(B)', 'In my survival kit, I have a tennis ball. I hold it tightly. Then I am not nervous anymore.')}
        {paragraphTemplate('(C)', 'Tomorrow is the first day of school. I have my own school survival kit.')}
      </>
    ),
    choices: choices,
  };

  const solution: ISolution = {
    correctAnswer: cardData[pageKey].solution,
    explanation: (
      <Typography>
        {
          '나만의 생존 키트를 만들었다는 (C)가 가장 먼저 위치하며, 첫 번째 물건에 대한 소개인 (B)와 Also로 이어지며 두 번째 물품에 대한 소개 (A)가 이어지는 것이 적절하다.'
        }
      </Typography>
    ),
    translation: (
      <Typography>
        {
          '내일은 학교 첫날이다. 나에게는 학교 생존 키트가 있다. 나의 학교 생존 키트에는 테니스 공이 있다. 나는 그것을 꽉 쥔다. 그러면 나는 더 이상 긴장되지 않는다. 나는 또한 많은 펜을 갖고 있다. 나는 색깔을 무척 좋아한다! '
        }
      </Typography>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSelectedRadioIdx = (index: number) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: index } }));
    changeData(pageNo, 1, 1, index);
  };

  const onSubmit = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
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
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const nodeData: IContentList[] = [
    {
      children: (
        <Box useFull background='white' useRound borderRadius={8} marginBottom={'15px'} paddingRight={'4px'} gap={4}>
          <Scroll tabIndex={0}>{problem.paragraph}</Scroll>
        </Box>
      ),
    },
    {
      children: (
        <Box useFull hAlign={'center'} vAlign={'center'}>
          <List
            gap={10}
            data={choices}
            align={'vertical'}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align={'vertical'}
                name={'radio-question-A'}
                label={value}
                value={index === cardData[pageKey].answer}
                isError={cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect}
                onClick={() => handleSelectedRadioIdx(index)}
                readOnly={cardData[pageKey].isSubmitted}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography width={'auto'}>{value}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Box>
      ),
    },
  ];

  return (
    <HE02901
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      nodeData={nodeData}
      answer={cardData[pageKey].answer}
      solution={solution}
      isSubmitted={cardData[pageKey].isSubmitted}
      onSubmit={onSubmit}
    ></HE02901>
  );
};

export default P16;
