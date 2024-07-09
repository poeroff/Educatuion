import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01802, { IHE01802Info } from '@maidt-cntn/pages/HE-018-02';
import { Box, Dropdown, EStyleFontSizes, IQuestionProps, Scroll, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { imgContentA02P02, textContentA02 } from './commonData';
import { L01C07A02 } from './store';

const P02 = () => {
  const { title, content, subTitleIndexes } = textContentA02;
  const { imgSrc, imgAlt } = imgContentA02P02;

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

  const pageNumber = 'P02';
  const pageKey = pageNumber.toLowerCase() as 'p02';
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
    const { answer1 } = cardPageData;
    const isCorrect = checkCorrect(1);
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
      answers={[cardPageData.answer1]}
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

        <Box marginTop={'20px'}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            • A tour of the facility in the sanctuary
          </Typography>
        </Box>

        <Box display='inline-flex' marginTop={'20px'}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            • Today’s Tasks: cleaning the habitats,
          </Typography>
        </Box>

        <Box hAlign='flex' display='inline-flex' marginLeft={30}>
          <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            preparing
          </Typography>
          <Typography weight={'bold'}>1)</Typography>
          <Dropdown
            type='up'
            width='264px'
            readOnly={cardPageData.isSubmitted}
            isError={cardPageData.isSubmitted && !checkCorrect(1)}
            dropdownList={cardPageData.option1}
            selectedValue={cardPageData.answer1}
            onClick={value => (value ? handleChange(1, value) : undefined)}
          />
        </Box>
      </Scroll>
    </HE01802>
  );
};

export default P02;