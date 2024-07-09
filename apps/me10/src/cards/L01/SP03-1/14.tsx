import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from '@/cards/L01/SP03-1/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, BoxWrap, IQuestionProps, Label, List, Radio, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import HE02901, { IContentList, ISolution } from '@maidt-cntn/pages/HE-029-01-API';

const P14 = ({ pageNo = 'P14' }: { pageNo?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);

  const pageKey = 'p14';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 다음 글을 읽고, 빈칸에 들어갈 말이 순서대로 바르게 짝지어진 것을 고르시오.',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const choices = ['Am - be', 'Are - am', 'Are - is', 'Is - am', 'Is - is'];

  const underLine = <Typography type='blank' width='150px' title='빈칸' boxColor='var(--color-black)' />;
  const problem = {
    paragraph: (
      <Typography>
        Hello, everyone! Welcome to my class! I’m Ms. Seo, your English teacher. Today is the first day of middle school. {underLine} you nervous? I’m
        also nervous, but I feel okay with this box. This box {underLine} my school survival kit.
      </Typography>
    ),
    choices: choices,
  };

  const solution: ISolution = {
    correctAnswer: cardData[pageKey].solution,
    explanation: (
      <Typography>
        {'주어가 you일 때 be동사는 are을 쓰며, 의문문이므로 be동사가 주어 앞으로 온다. 주어가 3인칭 단수인 This box이므로 be동사는 is가 알맞다.'}
      </Typography>
    ),
    translation: (
      <Typography>
        {
          '안녕하세요, 여러분! 제 수업에 오신 것을 환영합니다! 저는 서 선생님이고, 여러분의 영어 선생님이에요. 오늘은 중학교 첫날이네요. 긴장되나요? 저도 긴장되지만, 이 상자가 있어서 괜찮아요. 이 상자는 저의 학교 생존 키트예요.'
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

export default P14;
