import { BottomSheet, Box, EStyleButtonTypes, ETagLine, Input, List, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C04A03 } from './store';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C04A03);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P01', userSubmission);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData('P01', 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 1. Think and Plan',
  };

  const questionInfo = {
    text: 'Answer the questions to prepare for an advertisement.',
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData.p01.answer?.every(val => val)}
      onSubmit={submitAnswer}
      submitBtnColor={
        !cardData.p01.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      vAlign='flex-start'
    >
      <List data={cardData.p01.questions || []} gap={20}>
        {({ value: item, index = 1 }) => (
          <Box>
            <Typography>
              {index}. {item}
            </Typography>
            <Box marginTop={'8px'} paddingLeft={'40px'}>
              <Input
                placeholder='내용을 넣어 주세요.'
                width='100%'
                value={cardData.p01.answer?.[index - 1]}
                textAlign='left'
                onChange={e => handleChange(index - 1, e.target.value)}
                maxLength={100}
                readOnly={cardData.p01.isSubmitted}
                ariaLabel={`${index}번 답란`}
              />
            </Box>
            {index === cardData.p01.questions?.length && <br />}
          </Box>
        )}
      </List>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>
              {`(1) Baekje’s rich history and culture`}
              <br />
              {`(2) historically significant objects from Baekje, Baekje Geumdong Daehyangno`}
              <br />
              {`(3) Visitors have said their experience was truly amazing.`}
              {`(2) It has a comfortable, curved design to support your wrists better than others.`}
              <br />
              {`(4) You are not allowed to touch the artworks.`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
