import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01802, { IHE01802Info } from '@maidt-cntn/pages/HE-018-02';
import { Box, EStyleFontSizes, IQuestionProps, Input, InputStatus, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imgContentA02P03, textContentA02 } from './commonData';
import { L01C07A02 } from './store';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { title, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P03;

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
    imageHeight: '352px',
    altText: imgAlt,
  };

  const pageNumber = 'P03';
  const pageKey = pageNumber.toLowerCase() as 'p03';
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A02);
  const cardPageData = cardData[pageKey];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const inputData = userSubmissionList[0].inputData;
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer1: typeof inputData[0]?.value === 'string' ? inputData[0]?.value : '',
            answer2: typeof inputData[1]?.value === 'string' ? inputData[1]?.value : '',
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    const { answer1, answer2 } = cardPageData;
    const isCorrect = checkCorrect(1) && checkCorrect(2);
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
          {
            subKey: 2,
            type: 'TEXT',
            value: answer2,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const handleChange = (subKey: number, value: string) => {
    const answerKey = `answer${subKey}`;

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [answerKey]: value } }));
    changeData(pageNumber, 1, subKey, value);
  };

  const checkCorrect = (subKey: number) => {
    const answerKey = `answer${subKey}` as keyof typeof cardPageData;
    const solutionKey = `solution${subKey}` as keyof typeof cardPageData;
    return isAnswer(cardPageData[answerKey] as string, cardPageData[solutionKey] as string[]);
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

  return (
    <HE01802
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      info={info}
      answers={[cardPageData.answer1, cardPageData.answer2]}
      correctAnswers={cardPageData.correctAnswers}
      isCorrect={cardPageData.isCorrect}
      isSubmitted={cardPageData.isSubmitted}
      onSubmit={handleSubmit}
    >
      <Scroll>
        <Box display='flex' justifyContent='center'>
          <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            July 29, Monday
          </Typography>
        </Box>

        <Box hAlign='flex' display='inline-flex' marginTop={'20px'}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            • A tour of the
          </Typography>
          <Typography weight={'bold'}>2)</Typography>
          <Typography useGap={false}>
            f
            <Input
              width='175px'
              ariaLabel='2번 답 입력란 f로 시작하는 단어'
              readOnly={cardPageData.isSubmitted}
              status={cardPageData.isSubmitted ? (checkCorrect(1) ? InputStatus.DEFAULT : InputStatus.ERROR) : InputStatus.ENABLE}
              value={cardPageData.answer1}
              onChange={event => handleChange(1, event.target.value)}
            />
          </Typography>

          <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            in the
          </Typography>
        </Box>

        <Box marginLeft={30}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            sanctuary
          </Typography>
        </Box>

        <Box marginTop={'20px'}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            • Today’s Tasks: cleaning the habitats,
          </Typography>
        </Box>

        <Box hAlign='flex' display='inline-flex' marginLeft={30}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            preparing
          </Typography>
          <Typography weight={'bold'}>3)</Typography>
          <Typography useGap={false}>
            f
            <Input
              width='175px'
              ariaLabel='3번 답 입력란 f로 시작하는 단어'
              readOnly={cardPageData.isSubmitted}
              status={cardPageData.isSubmitted ? (checkCorrect(2) ? InputStatus.DEFAULT : InputStatus.ERROR) : InputStatus.ENABLE}
              value={cardPageData.answer2}
              onChange={event => handleChange(2, event.target.value)}
            />
          </Typography>
        </Box>
      </Scroll>
    </HE01802>
  );
};

export default P03;
