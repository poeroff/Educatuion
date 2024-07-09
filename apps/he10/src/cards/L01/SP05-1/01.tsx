import { Box, TMainHeaderInfoTypes, Typography, Recorder, EStyleButtonTypes, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { L01SP05_1 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01SP05_1);
  const { userId } = useRecoilValue(studentAtom);
  const [isRecordingDone, setIsRecordingDone] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [submitLabel, setSubmitLabel] = useState<string>('완료하기');
  const [submitBtnColor, setSubmitBtnColor] = useState(EStyleButtonTypes.SECONDARY);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 자유 발화',
  };
  const questionInfo = {
    text: '다음 질문에 대해 나의 답변을 자유롭게 말 해 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'RECORDER',
          value: '',
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

      if (isSubmitted) {
        setSubmitLabel('답안보기');
        setIsDisabled(false);
        setSubmitBtnColor(EStyleButtonTypes.PRIMARY);
        setIsRecordingDone(true);
        setIsSubmit(true);
      }
    }
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={submitLabel}
      submitDisabled={isDisabled}
      onSubmit={() => {
        if (isShowAnswer) {
          setIsShowAnswer(false);
          setSubmitBtnColor(EStyleButtonTypes.PRIMARY);
          setSubmitLabel('답안보기');
        } else if (isSubmit) {
          setIsShowAnswer(true);
          setSubmitBtnColor(EStyleButtonTypes.GRAY);
          setSubmitLabel('답안닫기');
        } else if (isRecordingDone) {
          setIsSubmit(true);
          setSubmitBtnColor(EStyleButtonTypes.PRIMARY);
          setSubmitLabel('답안보기');
        }
      }}
      submitBtnColor={submitBtnColor}
    >
      <Box vAlign='center' marginTop='20px' textAlign='center' tabIndex={101} flexDirection='column' gap='8px'>
        <Typography> What do you hope for your friends this year? </Typography>
        <Typography> Use an expression you learned in this lesson. </Typography>
      </Box>

      <Box hAlign='center' marginTop='20px'>
        <Recorder
          recorderIndex={0}
          onSubmit={() => {
            setIsRecordingDone(true);
            setIsDisabled(false);
            setSubmitBtnColor(EStyleButtonTypes.PRIMARY);

            changeData('P01', 1, 1, '');
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: '', isSubmitted: true } }));
            const userSubmission: userSubmissionType[] = [
              {
                mainKey: 1,
                inputData: [
                  {
                    subKey: 1,
                    type: 'RECORDER',
                    value: cardData.p01.answer,
                  },
                ],
              },
            ];
            submitDataWithResult('P01', userSubmission, true);
          }}
          onRefresh={() => setIsRecordingDone(false)}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box tabIndex={102}>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' tabIndex={103} flexDirection='column' gap='10px'>
            <Typography> {cardData.p01.exampleAnswerEng} </Typography>
            <Typography> {cardData.p01.exampleAnswerKor} </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
