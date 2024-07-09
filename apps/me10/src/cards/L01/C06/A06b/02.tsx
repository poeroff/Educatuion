import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import HE01702 from '@maidt-cntn/pages/HE-017-02';
import { Box, BoxWrap, EChipButtonType, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A06b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const PAGE_ID = 'P02';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A06b);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: 0,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (3)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '본문의 내용과 일치하면 T, 일치하지 않으면 F에 표시해 봅시다.',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  interface IRolePlayingDialog {
    label: string;
    labelColor: string;
    text: string;
  }

  const data: IRolePlayingDialog[] = [
    {
      label: 'Mrs.Seo',
      labelColor: 'var(--color-green-500)',
      text: 'Now, what do you want in your school survival kit?',
    },
    {
      label: 'Somin',
      labelColor: 'var(--color-purple-400)',
      text: 'A mirror! I look in the mirror and say, “Just be you!”',
    },
    {
      label: 'Jiwon',
      labelColor: 'var(--color-red-500)',
      text: 'For me, a stress ball. I hold the ball tightly. Then my stress goes away.',
    },
    {
      label: 'Mike',
      labelColor: 'var(--color-blue-800)',
      text: 'An eraser! It erases my mistakes. I start all over again!',
    },
    {
      label: 'Emily',
      labelColor: 'var(--color-purple-900)',
      text: `I need a Band-Aid! My feelings get hurt sometimes. But with the Band-Aid, I'm okay.`,
    },
    {
      label: 'Mrs.Seo',
      labelColor: 'var(--color-green-500)',
      text: `Great! Now make your own survival kit. Let's have a great year!`,
    },
  ];

  const dialog = (
    <List<IRolePlayingDialog>
      data={data}
      row={({ value }) => (
        <BoxWrap boxGap={0}>
          <Box color={value?.labelColor} height='fit-content'>
            <Typography useGap={true} weight='var(--font-weight-bold)'>
              {value?.label || ``}
            </Typography>
          </Box>
          <Box>
            <Typography useGap={true}>{value?.text}</Typography>
          </Box>
        </BoxWrap>
      )}
    />
  );

  const questionList = ['Somin looks in the mirror and says, “I start all over again!”'];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (isSubmitted && userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            values: userSubmissionList[0].inputData[0]?.value || cardData.p02.values,
            isSubmitted: true,
            isCorrect: areArraysEqualIgnoringCaseAndWhitespace(
              userSubmissionList[0].inputData[0]?.value || cardData.p02.values,
              cardData.p02.answers,
            ),
          },
        }));
      } else if (cardData.p02.isSubmitted) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            isCorrect: areArraysEqualIgnoringCaseAndWhitespace(cardData.p02.values, cardData.p02.answers),
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleValueChange = (values: string[], type: EChipButtonType, index: number) => {
    const choiceValue = type === EChipButtonType.TRUE ? (values[index] === 'T' ? '' : 'T') : values[index] === 'F' ? '' : 'F';
    const originalValue = cardData.p02.values;
    const newValue = [...originalValue];
    newValue[index] = choiceValue;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, values: newValue } }));
    changeData(PAGE_ID, 1, 1, newValue);
  };

  const submitAnswer = () => {
    if (!cardData.p02.isSubmitted) {
      const isCorrect = areArraysEqualIgnoringCaseAndWhitespace(cardData.p02.values, cardData.p02.answers);
      setCardData(prev => ({
        ...prev,
        p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.values,
            },
          ],
        },
      ];
      submitDataWithResult(PAGE_ID, userSubmission, isCorrect);
    }
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    if (value.length !== answer.length) {
      return false;
    }

    return value.every((val, index) => isAnswer(val, answer[index]));
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <HE01702
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={dialog}
      questionList={questionList}
      answers={cardData.p02.answers}
      answerLabel='답안'
      values={cardData.p02.values}
      handleValueChange={handleValueChange}
      isSubmitted={cardData.p02.isSubmitted}
      submitAnswer={submitAnswer}
    />
  );
};

export default P02;
