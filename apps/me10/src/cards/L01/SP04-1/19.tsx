import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SCP0401 } from './store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { Box, BoxWrap, EStyleFontSizes, IQuestionProps, Label, List, Radio, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import HE02901, { IContentList, ISolution } from '@maidt-cntn/pages/HE-029-01-API';

const DEFAULT_PAGE_KEY = 'P19';

interface P19Props {
  pageKey?: string;
}

const P19 = ({ pageKey = DEFAULT_PAGE_KEY }: P19Props) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01SCP0401);
  const storeKey = 'p19';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'writeENG',
    headerText: '확인문제',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        {'3. 다음 문장 빈칸의 어디에도 들어갈 수'}
        <Typography textDecoration={'underline'} fontSize={EStyleFontSizes['X-MEDIUM']}>
          {'없는'}
        </Typography>
        {'것을 고르시오.'}
      </>
    ),
    mark: cardData[storeKey].isSubmitted ? (cardData[storeKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const choices = ['is', 'am', 'likes', 'are', 'like'];

  const underLine = <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)' />;

  const problem = {
    paragraph: (
      <Typography usePre lineHeight='64px'>
        {`We `}
        {underLine}
        {` angry.\n You `}
        {underLine}
        {` not my classmate.\n He `}
        {underLine}
        {` my English teacher.\n She `}
        {underLine}
        {` soccer.\n They `}
        {underLine}
        {` math and science.\n`}
      </Typography>
    ),
    choices: choices,
  };

  const solution: ISolution = {
    correctAnswer: cardData[storeKey].solution,
    explanation: (
      <Typography usePre>
        {`be동사 am은 주어 I와 쓰인다. \n We`}
        <Typography textDecoration={'underline'}>{choices[3]}</Typography>
        {`angry.\n You`}
        <Typography textDecoration={'underline'}>{choices[3]}</Typography>
        {`not my classmate.\n He`}
        <Typography textDecoration={'underline'}>{choices[0]}</Typography>
        {`my English teacher.\n She`}
        <Typography textDecoration={'underline'}>{choices[2]}</Typography>
        {`soccer.\n They`}
        <Typography textDecoration={'underline'}>{choices[4]}</Typography>
        {`math and science.\n`}
      </Typography>
    ),
    translation: (
      <Typography usePre lineHeight='48px'>
        {`우리는 화가 난다.
          너는 나의 반친구가 아니다.
          그는 나의 영어 선생님이다.
          그녀는 축구를 좋아한다.
          그들은 수학과 과학을 좋아한다.`}
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
    setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], answer: index } }));
    changeData(pageKey, 1, 1, index);
  };

  const onSubmit = (isCorrect: boolean) => {
    setCardData(prev => ({ ...prev, [storeKey]: { ...prev[storeKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [storeKey]: {
            ...prev[storeKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[storeKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
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
                value={index === cardData[storeKey].answer}
                isError={cardData[storeKey].isSubmitted && !cardData[storeKey].isCorrect}
                onClick={() => handleSelectedRadioIdx(index)}
                readOnly={cardData[storeKey].isSubmitted}
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
      answer={cardData[storeKey].answer}
      solution={solution}
      isSubmitted={cardData[storeKey].isSubmitted}
      onSubmit={onSubmit}
    />
  );
};

export default P19;
