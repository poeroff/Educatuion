import { Box, TMainHeaderInfoTypes, Typography, Textarea, BottomSheet, Tag, ETagLine, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01SP05_1 } from './store';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP05_1);
  const { userId } = useRecoilValue(studentAtom);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const [submitLabel, setSubmitLabel] = useState<string>('완료하기');
  const [submitBtnColor, setSubmitBtnColor] = useState(EStyleButtonTypes.SECONDARY);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 자유 영작',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 써 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
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
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);

      if (isSubmitted) {
        setSubmitLabel('답안보기');
        setIsDisabled(false);
        setSubmitBtnColor(EStyleButtonTypes.PRIMARY);
      }
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value.trim() } }));
    changeData('P02', 1, 1, value.trim());
    setIsDisabled(value.trim().length <= 0 ? true : false);
    setSubmitBtnColor(value.trim().length <= 0 ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY);
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

  const submitAnswer = () => {
    const isCorrect = true;
    if (isShowAnswer) {
      setIsShowAnswer(false);
      setSubmitBtnColor(EStyleButtonTypes.PRIMARY);
      setSubmitLabel('답안보기');
    } else if (cardData.p02.isSubmitted) {
      setIsShowAnswer(true);
      setSubmitBtnColor(EStyleButtonTypes.GRAY);
      setSubmitLabel('답안닫기');
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
            },
          ],
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
      setSubmitLabel('답안보기');
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      submitDisabled={isDisabled}
      vAlign='center'
      onSubmit={submitAnswer}
      submitBtnColor={submitBtnColor}
    >
      <Typography weight={700} tabIndex={101}>
        Write a short paragraph about your experience of helping someone in need, using key expressions in this lesson.
      </Typography>

      <Box height='220px' marginTop='10px' useFull>
        <Textarea
          width='100%'
          height='100%'
          placeholder='내용을 넣어 주세요.'
          onChange={event => {
            handleChange(event.target.value);
          }}
          readOnly={cardData.p02.isSubmitted}
          tabIndex={102}
          ariaLabel='답란'
          value={cardData.p02.answer}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box tabIndex={103}>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' tabIndex={104} flexDirection='column' gap='10px'>
            <Typography> {cardData.p02.exampleAnswerEng} </Typography>
            <Typography> {cardData.p02.exampleAnswerKor} </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
