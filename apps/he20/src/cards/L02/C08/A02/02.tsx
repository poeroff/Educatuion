import { Box, TMainHeaderInfoTypes, Typography, Input, EStyleButtonTypes } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import { useRef, useEffect } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L02C08A02 } from './store';
import usePageData from '@/hooks/usePageData';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);
  const startRef3 = useRef<HTMLSpanElement>(null);
  const endRef3 = useRef<HTMLSpanElement>(null);

  const { submitDataWithResult, changeData, initData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C08A02);

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: 0,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'point1',
  };

  const questionInfo = {
    text: 'Discovering the Patterns',
  };

  const questionText = `What is the meaning of the red words in each sentence?`;

  const isBtnDisabled = () => {
    return cardData.P02.answer.trim() === '' || cardData.P02.isSubmitted;
  };

  const submit = async () => {
    try {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true } }));
      onGrade();
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, answer: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const onGrade = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.P02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitDataWithResult('P02', userSubmission, true);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submit}
      submitLabel='완료하기'
      submitDisabled={isBtnDisabled()}
      submitBtnColor={isBtnDisabled() ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box display='flex' flexDirection='column' gap='26px' padding='26px' width='100%' fontSize='28px' background='white' useRound>
        <GrammarChecker startRef={startRef1} endRef={endRef1}>
          <span ref={startRef1}></span> I am late again. I{' '}
          <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
            should have gotten
          </Typography>{' '}
          up early.
        </GrammarChecker>

        <GrammarChecker startRef={startRef2} endRef={endRef2}>
          <span ref={startRef2}></span> The roads are wet. It{' '}
          <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
            must have rained
          </Typography>{' '}
          earlier today.
        </GrammarChecker>

        <GrammarChecker startRef={startRef3} endRef={endRef3}>
          <span ref={startRef3}></span> Jimmy is in Africa. You{' '}
          <Typography color='var(--color-red-800)' title='빨간색 글자' useGap={false}>
            cannot have seen
          </Typography>{' '}
          him in Korea.
        </GrammarChecker>
      </Box>

      <Box paddingTop='26px'>
        <Box>
          <Typography>{questionText}</Typography>
          <Box marginTop={'8px'}>
            <Input
              width='100%'
              value={cardData.P02.answer}
              onChange={event => handleChange(1, event.target.value)}
              maxLength={100}
              readOnly={cardData.P02.isSubmitted}
              placeholder='내용을 넣어 주세요.'
              ariaLabel='답란'
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
