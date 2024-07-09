import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import HE01703 from '@maidt-cntn/pages/HE-017-03';
import { Box, BoxWrap, IQuestionProps, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { ChangeEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A06a } from './store';

const P02 = () => {
  const PAGE_ID = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A06a);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (3)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'What does Somin look in and say, “Just be you!”?',
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

  const answerLabel = '예시답안';
  const answer = { value1: 'She looks in the mirror and says, “Just be you!”' };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userAnswer: userSubmissionList[0].inputData[0]?.value || cardData.p02.userAnswer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, userAnswer: { [name]: value } } }));
    changeData(PAGE_ID, 1, 1, value);
  };

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p02.userAnswer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(PAGE_ID, userSubmission);
    }
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
    <HE01703
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      content={dialog}
      answerLabel={answerLabel}
      answer={answer}
      inputHeight='50%'
      onInputChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = target;
        handleInputChange(name, value);
      }}
      isSubmitted={cardData.p02.isSubmitted}
      onSubmit={onSubmit}
      inputs={cardData.p02.userAnswer}
    />
  );
};

export default P02;
