import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { Box, TMainHeaderInfoTypes, List, Label, Typography, Radio, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C11A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A02);
  const [isShow, setShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A. Listening',
  };

  const questionInfo = {
    text: '1. Listen to the dialogue. What is the topic of the dialogue?',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const data = [
    {
      text: 'a class trip at school',
    },
    {
      text: 'how to manage stress',
    },
    {
      text: 'after-school activities',
    },
    {
      text: 'ways to improve friendship',
    },
  ];

  const { userId } = useRecoilValue(studentAtom);

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.answer === cardData.p01.solution;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p01.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: index } }));
    changeData('P01', 1, 1, index);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p01.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : cardData.p01.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData.p01.isSubmitted && cardData.p01.answer === 0}
      onSubmit={submitAnswer}
      audioInfo={{ audioSrc: '/L01/C11/A02/HE1-L01-C11-A02.mp3' }}
    >
      <Box vAlign='center' useFull width={920}>
        <List
          gap={24}
          data={data}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              value={index === cardData.p01.answer}
              onClick={() => handleChange(index)}
              readOnly={cardData.p01.isSubmitted}
              ariaLabel={index + '번 보기'}
              isError={cardData.p01.isSubmitted && cardData.p01.answer !== cardData.p01.solution}
            >
              <Label value={index} marginRight={4} />
              <Typography>{value?.text}</Typography>
            </Radio>
          )}
        />
      </Box>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData.p01.solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
