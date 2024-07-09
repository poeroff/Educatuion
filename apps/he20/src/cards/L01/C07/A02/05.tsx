import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01802, { IHE01802Info } from '@maidt-cntn/pages/HE-018-02';
import { Box, EStyleFontSizes, IQuestionProps, Input, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imgContentA02P05, textContentA02 } from './commonData';
import { L01C07A02 } from './store';

const P05 = () => {
  const { title, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P05;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    markSize: 'middle',
  };
  const info: IHE01802Info = {
    title,
    content,
    subTitleIndexes,
    imageSrc: imgSrc,
    altText: imgAlt,
  };

  const PAGE_NAME = 'P05';
  const pageKey = PAGE_NAME.toLowerCase() as 'p05';
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

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02);
  const pageData = cardData[pageKey];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NAME)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputData = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: typeof inputData[0]?.value === 'string' ? inputData[0]?.value : '',
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NAME, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const { answer1, solution1 } = pageData;
    const isCorrect = solution1.includes(answer1.trim().toLowerCase());
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: answer1,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_NAME, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: string) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: value } }));
    changeData(PAGE_NAME, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NAME);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <HE01802
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      info={info}
      answers={[pageData.answer1]}
      correctAnswer={pageData.correctAnswer}
      isCorrect={pageData.isCorrect}
      isSubmitted={pageData.isSubmitted}
      onSubmit={handleSubmit}
    >
      <Scroll>
        <Box display='flex' justifyContent='center'>
          <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            July 31, Wednesday
          </Typography>
        </Box>

        <Box marginTop={'20px'}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            • Molly: an elderly elephant
          </Typography>
        </Box>

        <Box marginTop={'20px'}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            • Helping with Molly’s Foot Care: positive reinforcement training using
          </Typography>
        </Box>

        <Box hAlign='flex' display='inline-flex'>
          <Typography>
            5) r
            <Input
              width='150px'
              ariaLabel='5번 답 입력란 r로 시작하는 단어'
              readOnly={pageData.isSubmitted}
              value={pageData.answer1}
              onChange={event => handleChange(1, event.target.value)}
            />
          </Typography>
        </Box>

        <Box display='inline-flex'>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            to encourage
          </Typography>
        </Box>

        <Box>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            desirable behaviors
          </Typography>
        </Box>
      </Scroll>
    </HE01802>
  );
};

export default P05;
