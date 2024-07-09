import { Box, EStyleButtonTypes, TMainHeaderInfoTypes, Typography, Input } from '@maidt-cntn/ui';
import { GrammarChecker, Container } from '@maidt-cntn/ui/en';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page'
import { studentAtom } from '@/stores/student';
import { L04C08A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P02';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: 0,
          isAnswer : true,
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

const questionText ='What are the functions of the colored words?';

const isBtnDisabled = () => {
  return cardData.p02.answer.trim() === '' || cardData.p02.isSubmitted;
};

const onGrade = () => {
  if (cardData.p02.isSubmitted) {
    setShow(!isShow);
  } else {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer : true,
          },
        ],
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, true);
  }
};

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
    submitLabel='완료하기'
    submitBtnColor={cardData.p02.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    submitDisabled={isBtnDisabled()}
    onSubmit={onGrade}
    >
      <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px'  background='white' useRound>
      <GrammarChecker startRef={startRef1} endRef={endRef1}>
            Our team members{' '}
            <Typography  color='var(--color-blue-800)' title='파란색 글자' useGap={false}>consider</Typography>{' '}
            <Typography  color='var(--color-red-800)' title='빨간색 글자' useGap={false}>it</Typography>{' '}
            important{' '}
            <Typography  color='var(--color-red-800)' title='빨간색 글자' useGap={false}>to arrive</Typography>{' '}
            on time for meetings.
          </GrammarChecker>

          <GrammarChecker startRef={startRef2} endRef={endRef2}>
            When I have to give presentations, I{' '}
            <Typography  color='var(--color-blue-800)' title='파란색 글자' useGap={false}>find</Typography>{' '}
            <Typography  color='var(--color-red-800)' title='빨간색 글자' useGap={false}>it</Typography>{' '}
            difficult{' '} 
            <Typography  color='var(--color-red-800)' title='빨간색 글자'useGap={false}>to manage</Typography>{' '}
            public speaking anxiety.
          </GrammarChecker>
      </Box>
      
      <Box paddingTop='26px'>
        <Box>
          <Typography>{questionText}</Typography>
          <Box marginTop={'8px'}>
            <Input
              width='100%'
              value={cardData.p02.answer}
              readOnly={cardData.p02.isSubmitted}
              onChange={event => handleChange(1, event.target.value)}
              maxLength={100}
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