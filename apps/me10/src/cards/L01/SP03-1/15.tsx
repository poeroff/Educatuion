import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP03_1 } from '@/cards/L01/SP03-1/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, BoxWrap, IQuestionProps, Label, List, Radio, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import HE02901, { IContentList, ISolution } from '@maidt-cntn/pages/HE-029-01-API';

const P15 = ({ pageNo = 'P15' }: { pageNo?: string }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SP03_1);

  const pageKey = 'p15';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: '2. 생존 키트에 대한 다음 글을 읽고, 내용과 일치하는 것을 고르시오. ',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const choices = [
    '서 선생님은 붙임 쪽지에 할 일을 기록한다.',
    '소민이는 외모를 단장하기 위해 거울을 원한다.',
    '지원이는 친구들과 운동하기 위해 공을 원한다.',
    'Mike의 지우개는 그의 실수를 지워준다.',
    'Emily는 몸을 잘 다쳐서 반창고가 필요하다.',
  ];

  const problem = {
    paragraph: (
      <>
        <Typography>
          Ms. Seo: This box is my school survival kit. I have many things in it. First, I have some sticky notes. I use them on the first day. I write
          your names and remember them. Now, what do you want in your school survival kit?
        </Typography>
        <Typography>Somin: A mirror! I look in the mirror and say, “Just be you!”</Typography>
        <Typography>Jiwon: For me, a stress ball. I hold the ball tightly. Then my stress goes away.</Typography>
        <Typography>Mike: An eraser! It erases my mistakes. I start all over again!</Typography>
        <Typography>Emily: I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I’m okay.</Typography>
      </>
    ),

    choices: choices,
  };

  const solution: ISolution = {
    correctAnswer: cardData[pageKey].solution,
    explanation: (
      <Typography usePre>
        {`1번. 서 선생님은 붙임쪽지에 학생들의 이름을 기록한다.\n 2번. 소민이는 거울을 보고 “그냥 너답게 해!”라고 말한다.\n 3번. 지원이는 공을 꽉 쥐면 스트레스가 사라진다고 했다. \n 5번. Emily는 감정이 상처받을 때 반창고가 있으면 괜찮다고 했다.\n`}
      </Typography>
    ),
    translation: (
      <Typography usePre>
        {`서 선생님: 이 상자는 저의 학교 생존 키트예요. 저는 이 안에 많은 것을 가지고 있답니다. 첫째로, 붙임쪽지가 있어요. 저는 그것들을 첫날에 사용한답니다. 여러분의 이름을 적어서 기억해요. 자, 여러분의 학교 생존 키트에는 무엇을 원하나요?\n소민: 거울이요! 저는 거울을 보고 “그냥 너답게 해!”라고 말해요.\n지원: 저는, 스트레스 푸는 공이요. 저는 공을 꽉 쥐어요. 그러면 스트레스가 사라져요.\nMike: 지우개요! 그것은 저의 실수를 지워 줘요. 저는 처음부터 다시 시작해요!\nEmily: 저는 반창고가 필요해요! 저의 감정이 때때로 상처받아요. 그러나 이 반창고가 있어서, 저는 괜찮아요.`}
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
          <Box useFull>
            <Scroll tabIndex={0}>
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
            </Scroll>
          </Box>
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

export default P15;
